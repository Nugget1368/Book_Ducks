import { Application } from "./application/application.js";
import { Theme } from "./api/theme.js";

document.addEventListener("DOMContentLoaded", async () => {
    await Theme.getTheme();
});

const app = new Application();
app.start();