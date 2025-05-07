import { Library } from "../api/library.js";
import { Factory } from "../builders/factory.js";
import { Auth } from "../auth/auth.js";
import { Profile } from "../api/profile.js";
export class Application {
    constructor() {
        this.profile = null;
    }

    async renderPage() {
        /* //DELETE THIS */
        // let user = {
        //     username: "Batman",
        //     password: "batman123"
        // }
        // await Auth.login(user);
        /* //DELETE THIS */
        let isLoggedIn = await Auth.isAuthenticated();
        if (isLoggedIn === true) {
            await this.login();
        }
        let books = await Library.getBooks();
        books.data.forEach(book => {
            let card = Factory.buildBookCard(book, isLoggedIn);
            document.querySelector(".books").append(card);
            if (isLoggedIn === true) {
                //Lägg in book direkt?
                card.querySelector(`button#save-book-${book.documentId}`).addEventListener("click",async (event) => {
                    event.preventDefault();
                    await this.addToLibrary(book.documentId);
                } );
            }
        });
    }

    async start() {
        this.renderPage();
    }

    async sayHello(username = "") {
        let header = document.querySelector("main header");
        let h2 = document.createElement("h2");
        h2.textContent = `Welcome ${username}!`;
        h2.classList.add("comic-bubble");
        header.append(h2);
    }

    async addToLibrary(id) {
        await this.profile.addToLibrary(id);
    }

    async login() {
        let user = await Auth.getUser();
        this.profile = new Profile();
        this.profile.setEmail(user.email).setId(user.documentId).setUsername(user.username);
        let library = await this.profile.getLibrary();
        this.profile.setLibrary(library);
        await this.sayHello(this.profile.username);
    }

    async logout() {

    }
}