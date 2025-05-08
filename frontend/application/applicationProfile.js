import { Auth } from "../auth/auth.js";

export class Application{
    async renderPage(){
        let user = await Auth.getUser();
        let article = document.createElement("article");
        article.innerHTML = `
            <p><b>Username:</b> ${user.username}</p>
            <p><b>Email:</b> ${user.email}</p>`;
        let section = document.querySelector("aside section");
        section.append(article);
    }

    async start() {
        this.renderPage();
    }
}