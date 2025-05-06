export class UserBuilder{
    constructor(){
        this.username = null;
        this.email = null;
        this.password = null;
    }

    setUsername(username){
        this.username = username;
    }

    setEmail(email){
        this.email = email;
    }

    setPassword(password){
        this.password = password;
    }

    build(){
        return {
            username: this.username,
            email: this.email,
            password: this.password
        }
    }
}