export class UserBuilder {
    constructor() {
        this.id = null;
        this.username = null;
        this.email = null;
        this.password = null;
        this.library = null;
        this.loggedIn = false;
    }

    setId(id) {
        this.id = id;
        return this;
    }

    setUsername(username) {
        this.username = username;
        return this;
    }

    setEmail(email) {
        this.email = email;
        return this;
    }

    setPassword(password) {
        this.password = password;
        return this;
    }

    setLibrary(library) {
        if (library === null || library === undefined)
            this.library = [];
        else
            this.library = library;
        return this;
    }

    build() {
        return {
            username: this.username,
            email: this.email,
            password: this.password,
            library: this.library,
            id: this.id
        }
    }
}