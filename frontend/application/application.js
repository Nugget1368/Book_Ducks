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
        let user = {
            username: "bobbi",
            password: "bobbi123"
        }
        await Auth.login(user);
        /* //DELETE THIS */
        if (await Auth.isAuthenticated() === true) {
            await this.login(user);
        }
        let books = await Library.getBooks();
        books.data.forEach(book => {
            let card = Factory.buildBookCard(book);
            document.querySelector(".books").append(card);
        });
        this.addToLibrary("<id>");
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

    async addToLibrary(id){
        // let docId = 1;
        // await this.profile.addToLibrary(docId);
    }

    async login() {
        let user = await Auth.getUser();
        this.profile = new Profile();
        this.profile.setEmail(user.email).setId(user.id).setLibrary(user.library).setUsername(user.username);
        console.log(this.profile);
        await this.sayHello(this.profile.username);
    }

    async logout() {

    }
}