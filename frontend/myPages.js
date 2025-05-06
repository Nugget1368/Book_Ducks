import { Auth } from "./auth/auth.js";
import { Theme } from "./api/theme.js";
import { Application } from "./application/applicationProfile.js";

await Theme.getTheme();


if(await Auth.isAuthenticated() === true){
    let app = new Application();
    app.start();
}
else{
    let article = document.createElement("article");
    article.classList.add("comic-bubble");
    let h2 = document.createElement("h2");
    h2.textContent = "You are not logged in.";
    let p = document.createElement("p");
    p.innerHTML = "Please <a href=\"login.html\">login</a> to continue.";
    article.append(h2, p);
    let section = document.querySelector("section");
    section.append(article);
}