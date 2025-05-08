import { Auth } from "./auth/auth.js";
import { UserBuilder } from "./builders/userBuilder.js";
import { Theme } from "./api/theme.js";

document.addEventListener("DOMContentLoaded", async () => {
    await Theme.getTheme();
});

let span = document.querySelector("#show-register");
span.addEventListener('click', () => {
    document.querySelector("#login-form").classList.add("hidden");
    document.querySelector("#register-form").classList.remove("hidden");
})

let loginForm = document.querySelector("#login-form");
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let username = loginForm.querySelector("#username").value.trim();
    let password = loginForm.querySelector("#password").value.trim();
    let builder = new UserBuilder();
    builder.setUsername(username).setPassword(password);
    let user = builder.build();
    let success = await Auth.login(user);
    if (success) {
        window.location.href = "index.html";
    } else {
    }
});

let registerForm = document.querySelector("#register-form");
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let email = registerForm.querySelector("#email").value.trim();
    let username = registerForm.querySelector("#username").value.trim();
    let password = registerForm.querySelector("#password").value.trim();
    let builder = new UserBuilder();
    builder.setEmail(email).setUsername(username).setPassword(password);
    let user = builder.build();
    let users_permissions = await Auth.register(user);
    let profileSuccess = await Auth.createProfile(users_permissions.data.user);
    if (users_permissions.success && profileSuccess) {
        window.location.href = "index.html";
    } else {
    }
});