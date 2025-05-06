export class UserBuilder{
    constructor(){
        this.username = null;
        this.email = null;
        this.password = null;
    }

    setUsername(username){
        this.username = username;
        return this;
    }

    setEmail(email){
        this.email = email;
        return this;
    }

    setPassword(password){
        this.password = password;
        return this;
    }

    build(){
        return {
            username: this.username,
            email: this.email,
            password: this.password
        }
    }
}