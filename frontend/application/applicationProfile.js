import { Auth } from "../auth/auth.js";
import { Factory } from "../builders/factory.js";
import { Profile } from "../api/profile.js";

export class Application {
    constructor() {
        this.profile = null;
    }

    async renderPage() {
        await this.login();
        let article = document.createElement("article");
        article.innerHTML = `
            <p><b>Username:</b> ${this.profile.username}</p>
            <p><b>Email:</b> ${this.profile.email}</p>`;
        let section = document.querySelector("aside section");
        section.append(article);
        await this.getLibrary();
    }

    async login() {
        let user = await Auth.getUser();
        this.profile = new Profile();
        this.profile.setEmail(user.email).setId(user.documentId).setUsername(user.username);
        let library = await this.profile.getLibrary();
        this.profile.setLibrary(library);
    }

    async getLibrary(){
        if(this.profile.library !== null && this.profile.library.length > 0){
            this.profile.library.forEach(book => {
                let card = Factory.buildBookCard(book, true);
                document.querySelector("#my-library").append(card);
            });
        }
    }

    async start() {
        this.renderPage();
    }
}