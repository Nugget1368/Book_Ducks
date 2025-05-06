import { Auth } from "../auth/auth.js";

export class Application{
    async renderPage(){
        let user = await Auth.getUser();
        let article = document.createElement("article");
        article.classList.add("book");
        article.innerHTML = `
        <section class="column">
            <p><b>Username:</b> ${user.username}</p>
            <p><b>Email:</b> ${user.email}</p>
            <a>Read later</a>
        </section>`;
        let section = document.querySelector("section");
        section.append(article);
    }

    async start() {
        this.renderPage();
    }
}