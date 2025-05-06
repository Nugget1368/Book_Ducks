import { Library } from "../api/library.js";
import { Factory } from "../builders/factory.js";
import { Auth } from "../auth/auth.js";
import { Theme } from "../api/theme.js";
export class Application {

    async renderPage() {
        await Theme.getTheme();
        if (await Auth.isAuthenticated() === true) {
            console.log("hello?");
            await this.sayHello();
        }
        let books = await Library.getBooks();
        books.data.forEach(book => {
            let card = Factory.buildBookCard(book);
            document.querySelector(".books").append(card);
        });
    }

    async start() {
        this.renderPage();
    }

    async sayHello() {
        let username = await Auth.getUsername();
        let header = document.querySelector("main header");
        let h2 = document.createElement("h2");
        h2.textContent = `Welcome ${username}!`;
        h2.classList.add("comic-bubble");
        header.append(h2);
    }

    async login() {

    }

    async logout() {

    }
}