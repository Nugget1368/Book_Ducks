import { API } from "../api/api.js";

export class BookBuilder {
    constructor(id) {
        this.id = id;
        this.title = null;
        this.author = null;
        this.description = null;
        this.image = null;
        this.pages = 0;
        this.releaseDate = null;
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    setAuthor(author) {
        this.author = author;
        return this;
    }

    setDescription(description) {
        this.description = description;
        return this;
    }

    setImage(image) {
        this.image = image;
        return this;
    }

    setPages(pages) {
        this.pages = pages;
        return this;
    }

    setReleaseDate(releaseDate) {
        this.releaseDate = releaseDate;
        return this;
    }

    build() {
        let article = document.createElement("article");
        article.classList.add("book");
        article.id = `book-${this.id}`;
        let header = document.createElement("header");
        let content = document.createElement("div");
        content.classList.add("book-content");
        let info = document.createElement("div");
        info.classList.add("book-info");

        if (this.image != null || this.image != undefined || this.image != "") {
            let img = document.createElement("img");
            img.src = `${API.getBaseUrl()}${this.image}`;
            article.append(img);
        }
        article.append(content);
        content.append(header);

        if (this.title != null || this.title != undefined || this.title != "") {
            let h2 = document.createElement("h2");
            h2.textContent = this.title;
            header.append(h2);
        }

        if (this.author != null || this.author != undefined || this.author != "") {
            let h3 = document.createElement("h3");
            h3.textContent = this.author;
            header.append(h3);
        }

        if (this.pages != null || this.pages != undefined || this.pages != "") {
            let p = document.createElement("p");
            p.textContent = `${this.pages} pages`;
            info.append(p);
        }

        if (this.releaseDate != null || this.releaseDate != undefined || this.releaseDate != "") {
            let p = document.createElement("p");
            p.textContent = `Released: ${this.releaseDate}`;
            info.append(p);
        }

        content.append(info);

        return article;
    }
}