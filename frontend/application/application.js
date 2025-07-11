import { Library } from "../api/library.js";
import { Factory } from "../builders/factory.js";
import { Auth } from "../auth/auth.js";
import { Profile } from "../api/profile.js";
import { RenderPageBuilder } from "../builders/renderPage.js";
import { Sorting } from "./sorting.js";
export class Application {
    constructor() {
        this.profile = null;
        this.isLoggedIn = false;
        this.library = null;
    }

    async start() {
        this.library = new Library();
        /// TODO: Fix this, cannot have to async methods on the same line
        await this.library.setBooks();
        await this.library.setRatings();
        this.isLoggedIn = await Auth.isAuthenticated();
        if (this.isLoggedIn === true) {
            await this.login();
        }
        this.renderHome();
    }

    async formHandler() {
        /// TODO : Clean This
        /// TODO: Move to something like 'EventHandler.js'
        document.querySelector("form").addEventListener("submit", async (event) => {
            event.preventDefault();
            let id = document.querySelector("form").id;
            let rating = document.querySelector("form input[type=radio]:checked");
            if(!rating)
                return;
            rating = parseInt(rating.value);
            /// TODO: Simplify Null-check, Only return is needed
            if (rating !== null || rating !== undefined || rating !== "" || rating !== NaN) {
                /// TODO: Fix this
                let response = await this.library.updateRating(id, { value: rating, profile: this.profile.id, profileId: this.profile.id });
                if (response !== false) {
                    document.querySelector("dialog[data-modal]").close();
                    this.library.setUserRatings(this.profile.id);
                    this.syncLibrary();
                    let section = document.querySelector("section#profile");
                    if (section) {
                        let ul = this.renderMyRatedBooks();
                        section.querySelector("ul").replaceWith(ul);
                        await this.renderBooks(this.profile.library, true);
                    }
                    else {
                        await this.renderBooks(this.library.books, this.isLoggedIn);
                    }
                }
            }
        })
    }

    async sayHello(username = "") {
        let header = document.querySelector("main header");
        let h2 = document.createElement("h2");
        h2.textContent = `Welcome ${username}!`;
        h2.classList.add("comic-bubble");
        header.append(h2);
    }

    syncLibrary() {
        this.profile.library.map(book => {
            let savedBook = this.library.books.find(b => b.documentId === book.documentId);
            if (savedBook) {
                book.rating.average = savedBook.rating.average;
            }
            return book;
        });
    }

    async addToLibrary(book = {}) {
        return await this.profile.addToLibrary(book);
    }

    async login() {
        let user = await Auth.getUser();
        this.profile = new Profile();
        this.profile.setEmail(user.email).setId(user.documentId).setUsername(user.username);
        let library = await this.profile.getLibrary();
        this.library.setUserRatings(this.profile.id);
        this.profile.setLibrary(library);
        await this.formHandler();
        this.renderLogout();
    }

    async renderHome() {
        RenderPageBuilder.renderIndex();
        if (this.isLoggedIn === true) {
            await this.sayHello(this.profile.username);
        }
        await this.renderBooks(this.library.books, this.isLoggedIn);
    }

    async renderProfile() {
        /// TODO: Clean this
        RenderPageBuilder.renderProfile();
        if (await Auth.isAuthenticated() === true) {
            RenderPageBuilder.renderProfileAside(this.profile.username, this.profile.email);
            RenderPageBuilder.renderSelect();
            //My Rated Books
            let myRatedBooks = RenderPageBuilder.renderMyRatedBooks();
            let ratedBooksList = this.renderMyRatedBooks();
            let section = document.querySelector("aside section");
            myRatedBooks.append(ratedBooksList);
            section.innerHTML = "";
            section.append(myRatedBooks);
            //Saved Books
            await this.renderBooks(this.profile.library, true);
            //Sort Saved Books
        /// TODO: Move to something like 'EventHandler.js'
            document.querySelector("select#sort").addEventListener("change", async (event) => {
                event.preventDefault();
                let command = event.target.value.split("-");
                command[1] === "up" ?
                    Sorting.sortStringUp(this.profile.library, command[0]) :
                    Sorting.sortStringDown(this.profile.library, command[0]);
                document.querySelector("section.books .content").innerHTML = ``;
                await this.renderBooks(this.profile.library, true);
            });
            //Sort Rated Books
            
        /// TODO: Move to something like 'EventHandler.js'
            section.querySelector("select#sort-ratings").addEventListener("change", async (event) => {
                event.preventDefault();
                let command = event.target.value.split("-");
                if (command[0] !== "rating") {
                    command[1] === "up" ?
                        Sorting.sortStringUp(this.library.ratedBooks, "book", command[0]) :
                        Sorting.sortStringDown(this.library.ratedBooks, "book", command[0]);
                }
                else {
                    command[1] === "high" ?
                        Sorting.sortNumberLow(this.library.ratedBooks, "rating", "value") :
                        Sorting.sortNumberHigh(this.library.ratedBooks, "rating", "value");
                }
                // ||
                let ul = this.renderMyRatedBooks(this.library.ratedBooks);
                section.querySelector("ul").replaceWith(ul);
            });
        }
        else {
            let article = document.createElement("article");
            article.id = "not-logged-in";
            article.classList.add("comic-bubble");
            let h2 = document.createElement("h2");
            h2.textContent = "You are not logged in.";
            let p = document.createElement("p");
            p.innerHTML = "Please <a href=\"login.html\">login</a> to continue.";
            article.append(h2, p);
            let section = document.querySelector("section.books");
            section.append(article);
        }
    }

    async renderBooks(books = [], isLoggedIn = false) {
        let content = document.querySelector(".books .content");
        content.innerHTML = ``;
        books.forEach(book => {
            let card = Factory.buildBookCard(book, isLoggedIn);
            content.append(card);
            if (isLoggedIn === true) {
                //Lägg in book direkt?
                let savedBook = this.profile.library.find(b => b.documentId === book.documentId) ? true : false;
                if (savedBook === true) {
                    card.querySelector(`button#save-book-${book.documentId}`).classList.add("bookmarked");
                }
                //Save book
                
        /// TODO: Move to something like 'EventHandler.js'
                card.querySelector(`button#save-book-${book.documentId}`).addEventListener("click", async (event) => {
                    event.preventDefault();
                    if (savedBook === true) {
                        let result = await this.profile.removeFromLibrary(book.documentId);
                        if (result === true) {
                            card.querySelector(`button#save-book-${book.documentId}`).classList.remove("bookmarked");
                            savedBook = false;
                        }
                    }
                    else {
                        let result = await this.addToLibrary(book);
                        if (result === true) {
                            card.querySelector(`button#save-book-${book.documentId}`).classList.add("bookmarked");
                            savedBook = true;
                        }
                    }
                });
                //Modal
                card.querySelector("[data-open-modal]").addEventListener("click", async () => {
                    let modal = document.querySelector(`[data-modal]`);
                    this.renderModal(book, card.querySelector("img").src);
                    modal.showModal();
                })
            }
        });
    }

    renderModal(book = {}, img = "") {
        /// TODO: Move to Factory.js or Renderpage.js
        let modal = document.querySelector(`[data-modal]`);
        modal.querySelector("h3").textContent = book.title;
        let content = modal.querySelector("div.content");
        let form = modal.querySelector("form");
        form.id = book.rating.documentId;
        let nodeList = RenderPageBuilder.renderBook(book, img);
        form.before(nodeList.author, nodeList.description, nodeList.rating);
        content.before(nodeList.img);
    }

    renderMyRatedBooks() {
        /// TODO: Move to Factory.js
        let ul = document.createElement("ul");
        this.library.ratedBooks.forEach(rating => {
            let li = document.createElement("li");
            li.textContent = `${rating.book.title} (${rating.book.author}) \r\nRated: ${rating.rating.value}/10 Stars`;
            ul.append(li);
        });
        return ul;
    }

    renderLogout() {
        /// TODO: Move to renderPage.js
        let a = document.querySelector("a#login-page");
        a.innerHTML = `<span class="material-symbols-outlined">
                    logout
                </span><label>Logout</label>`;
        a.removeAttribute("href");
        a.addEventListener("click", (event) => {
            event.preventDefault();
            this.logout();
            window.location.href = "index.html";
        });
    }

    async logout() {
        Auth.removeToken();
    }
}