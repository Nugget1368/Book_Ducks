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
    }

    async start() {
        this.isLoggedIn = await Auth.isAuthenticated();
        if (this.isLoggedIn === true) {
            await this.login();
        }
        this.renderHome();
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
    }

    async renderHome() {
        RenderPageBuilder.renderIndex();
        if(this.isLoggedIn === true) {
            await this.sayHello(this.profile.username);
        }
        let books = await Library.getBooks();
        await this.renderBooks(books.data, this.isLoggedIn);
    }

    async renderProfile() {
        RenderPageBuilder.renderProfile();
        if (await Auth.isAuthenticated() === true) {
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
                document.querySelector("section.books").innerHTML = ``;
                await this.renderBooks(this.profile.library, true);
            });
        }
        else {
            let article = document.createElement("article");
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
            document.querySelector(".books").append(card);
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
            }
        });
    }

    async logout() {

    }
}