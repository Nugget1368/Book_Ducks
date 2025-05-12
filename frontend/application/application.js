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
        this.isLoggedIn = await Auth.isAuthenticated();
        if (this.isLoggedIn === true) {
            await this.login();
        }
        this.library = new Library();
        /// TODO: Fix this, cannot have to async methods on the same line
        await this.library.setBooks();
        await this.library.setRatings();
        this.renderHome();
        document.querySelector("form").addEventListener("submit", async (event) => {
            event.preventDefault();
            let id = document.querySelector("form").id;
            let rating = document.querySelector("form input[type=radio]:checked").value;
            rating = parseInt(rating);
            if (rating !== null || rating !== undefined || rating !== "") {
                /// TODO: Fix this
                let response = await this.library.updateRating(id, { value: rating, profile: this.profile.id, profileId: this.profile.id });
                if (response !== false) {
                    document.querySelector("dialog[data-modal]").close();
                    /// TODO: Fix this
                    location.reload();
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

    async addToLibrary(book = {}) {
        return await this.profile.addToLibrary(book);
    }

    async login() {
        let user = await Auth.getUser();
        this.profile = new Profile();
        this.profile.setEmail(user.email).setId(user.documentId).setUsername(user.username);
        let library = await this.profile.getLibrary();
        this.profile.setLibrary(library);
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
        RenderPageBuilder.renderProfile();
        if (await Auth.isAuthenticated() === true) {
            RenderPageBuilder.renderProfileAside();
            RenderPageBuilder.renderSelect();
            let article;
            if (!document.querySelector("aside article"))
                article = document.createElement("article");
            else
                article = document.querySelector("aside article");
            article.innerHTML = `
                <p><b>Username:</b> ${this.profile.username}</p>
                <p><b>Email:</b> ${this.profile.email}</p>`;
            let section = document.querySelector("aside section");
            section.append(article);
            await this.renderBooks(this.profile.library, true);
            document.querySelector("select#sort").addEventListener("change", async (event) => {
                event.preventDefault();
                if (event.target.value === "title-up") {
                    Sorting.sortTitleUp(this.profile.library);
                }
                else if (event.target.value === "title-down") {
                    Sorting.sortTitleDown(this.profile.library);
                }
                else if (event.target.value === "author-up") {
                    Sorting.sortAuthorUp(this.profile.library);
                }
                else if (event.target.value === "author-down") {
                    Sorting.sortAuthorDown(this.profile.library);
                }
                document.querySelector("section.books .content").innerHTML = ``;
                await this.renderBooks(this.profile.library, true);
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
        books.forEach(book => {
            let card = Factory.buildBookCard(book, isLoggedIn);
            document.querySelector(".books .content").append(card);
            if (isLoggedIn === true) {
                //Lägg in book direkt?
                let savedBook = this.profile.library.find(b => b.documentId === book.documentId) ? true : false;
                if (savedBook === true) {
                    card.querySelector(`button#save-book-${book.documentId}`).classList.add("bookmarked");
                }
                card.querySelector(`button#save-book-${book.documentId}`).addEventListener("click", async (event) => {
                    event.preventDefault();
                    if (savedBook === true) {
                        let result = await this.profile.removeFromLibrary(book.documentId);
                        if (result === true)
                            card.querySelector(`button#save-book-${book.documentId}`).classList.remove("bookmarked");
                    }
                    else {
                        let result = await this.addToLibrary(book);
                        if (result === true)
                            card.querySelector(`button#save-book-${book.documentId}`).classList.add("bookmarked");
                    }
                });
                card.querySelector("[data-open-modal]").addEventListener("click", async () => {
                    let modal = document.querySelector(`[data-modal]`);
                    modal.querySelector("h3").textContent = book.title;
                    let content = modal.querySelector("div.content");
                    let form = modal.querySelector("form");
                    /// TODO: Bryt ut, 'on-open' eller 'on-close' hos modal
                    let removeElements = content.querySelectorAll(":not(h3, form, form *)");
                    let oldimg = modal.querySelector("img");
                    if (oldimg) {
                        oldimg.remove();
                    }
                    if (removeElements) {
                        removeElements.forEach(e => e.remove());
                    }
                    let author = document.createElement("h4");
                    author.textContent = book.author;
                    form.before(author);
                    let description = document.createElement("p");
                    description.textContent = book.description;
                    form.before(description);
                    let rating = document.createElement("p");
                    rating.textContent = "Rating: " + book.rating.average + "/10 stars";
                    form.before(rating);
                    let img = document.createElement("img");
                    img.src = card.querySelector("img").src;
                    content.before(img);
                    modal.querySelector("form").id = book.rating.documentId;
                    modal.showModal();
                })
            }
        });
    }

    renderLogout() {
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