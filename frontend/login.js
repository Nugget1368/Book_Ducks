import { Auth } from "./auth/auth.js";
import { UserBuilder } from "./builders/userBuilder.js";

let span = document.querySelector("#show-register");
span.addEventListener('click', () => {
    document.querySelector("#login-form").classList.add("hidden");
    document.querySelector("#register-form").classList.remove("hidden");
})

let loginForm = document.querySelector("#login-form");
console.log(loginForm);
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let username = document.querySelector("#username").value.trim();
    let password = document.querySelector("#password").value.trim();
    let builder = new UserBuilder();
    builder.setUsername(username).setPassword(password);
    let user = builder.build();
    let success = await Auth.login(user);
    if (success) {
        alert("You have successfully logged in.");
    } else {
        console.log("Could not login...");
    }
});

let registerForm = document.querySelector("#register-form");
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let email = document.querySelector("#email").value.trim();
    let username = document.querySelector("#username").value.trim();
    let password = document.querySelector("#password").value.trim();
    let builder = new UserBuilder();
    builder.setEmail(email).setUsername(username).setPassword(password);
    let user = builder.build();
    let success = await Auth.register(user);
    if (success) {
        alert("You have successfully registered.");
    } else {
        console.log("Could not register...");
    }
});