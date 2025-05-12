import { BookBuilder } from "./bookBuilder.js";
import { API } from "../api/api.js";

export class Factory {
    static buildBookCard(book, isLoggedIn = false) {
        let bookBuilder = new BookBuilder(book.documentId);
        bookBuilder.setTitle(book.title).setAuthor(book.author).setDescription(book.description).setImage(book.image.url).setPages(book.pages).setReleaseDate(book.releaseDate).setRating(book.rating.average).build();
        let article = document.createElement("article");
        article.classList.add("book");
        article.id = `book-${bookBuilder.id}`;
        let header = document.createElement("header");
        let content = document.createElement("div");
        content.classList.add("book-content");
        let info = document.createElement("div");
        info.classList.add("book-info");
        if (isLoggedIn === true) {
            let saveBtn = document.createElement("button");
            saveBtn.classList.add("material-symbols-outlined");
            saveBtn.id = `save-book-${bookBuilder.id}`;
            saveBtn.innerHTML = `bookmark`;
            article.append(saveBtn);
            let rateBtn = document.createElement("button");
            rateBtn.classList.add("material-symbols-outlined");
            rateBtn.id = `rate-book-${bookBuilder.id}`;
            rateBtn.setAttribute("data-open-modal", "");
            rateBtn.innerHTML = `star`;
            article.append(rateBtn);
        }

        if (bookBuilder.image != null || bookBuilder.image != undefined || bookBuilder.image != "") {
            let img = document.createElement("img");
            img.src = `${API.getBaseUrl()}${bookBuilder.image}`;
            article.append(img);
        }
        article.append(content);
        content.append(header);

        if (bookBuilder.title != null || bookBuilder.title != undefined || bookBuilder.title != "") {
            let h2 = document.createElement("h2");
            h2.textContent = bookBuilder.title;
            header.append(h2);
        }

        if (bookBuilder.author != null || bookBuilder.author != undefined || bookBuilder.author != "") {
            let h3 = document.createElement("h3");
            h3.textContent = bookBuilder.author;
            header.append(h3);
        }
        
        if(bookBuilder.rating != null || bookBuilder.rating != undefined || bookBuilder.rating != "") {
            let rating = document.createElement("p");
            rating.textContent = `Rating: ${bookBuilder.rating}/10 stars`;
            info.append(rating);
        }

        if (bookBuilder.pages != null || bookBuilder.pages != undefined || bookBuilder.pages != "") {
            let p = document.createElement("p");
            p.textContent = `${bookBuilder.pages} pages`;
            info.append(p);
        }

        if (bookBuilder.releaseDate != null || bookBuilder.releaseDate != undefined || bookBuilder.releaseDate != "") {
            let p = document.createElement("p");
            p.textContent = `Released: ${bookBuilder.releaseDate}`;
            info.append(p);
        }

        content.append(info);

        return article;
    }

    static buildBookDetail(book){
        
    }
}