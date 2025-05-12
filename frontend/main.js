import { Application } from "./application/application.js";
import { Theme } from "./api/theme.js";

document.addEventListener("DOMContentLoaded", async () => {
    await Theme.getTheme();
});

const app = new Application();
app.start();

document.querySelector("header #home").addEventListener("click", async ()=>{
    await app.renderHome();
});

document.querySelector("header #my-pages").addEventListener("click", async ()=>{
    await app.renderProfile();
})

document.querySelector("[data-modal] [data-close-modal]").addEventListener("click", async () => {
    let modal = document.querySelector(`[data-modal]`);
    modal.close();
})