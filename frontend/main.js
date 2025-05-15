import { Application } from "./application/application.js";
import { Theme } from "./api/theme.js";

document.addEventListener("DOMContentLoaded", async () => {
    await Theme.getTheme();
});

const app = new Application();
app.start();

document.querySelector("header #home").addEventListener("click", async () => {
    await app.renderHome();
});

document.querySelector("header #my-pages").addEventListener("click", async () => {
    await app.renderProfile();
})
document.querySelector("[data-modal]").addEventListener("close", async () => {
    let modal = document.querySelector(`[data-modal]`);
    let removeElements = modal.querySelectorAll(":not(button[data-close-modal], div.row, div.row > *,h3, form, form *), img");
    if (removeElements) {
        removeElements.forEach(e => {
            e.remove()
        });
    }
    let radio = modal.querySelector("form input[type=radio]:checked");
    if (radio)
        radio.checked = false;
})

document.querySelector("[data-modal] [data-close-modal]").addEventListener("click", async () => {
    let modal = document.querySelector(`[data-modal]`);
    modal.close();
})