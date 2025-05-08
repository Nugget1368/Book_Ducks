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
        return {
            id: this.id,
            title: this.title,
            author: this.author,
            description: this.description,
            image: this.image,
            pages: this.pages,
            releaseDate: this.releaseDate
        };
    }
}