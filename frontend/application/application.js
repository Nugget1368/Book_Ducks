import { Library } from "../api/library.js";
import { Factory } from "../builders/factory.js";
export class Application {

    async renderPage(){
        let books = await Library.getBooks();
        books.data.forEach(book => {
            let card = Factory.buildBookCard(book);
            document.querySelector(".books").append(card);
        });
    }

    async start(){
        this.renderPage();
    }

    async login(){

    }

    async logout(){

    }
}