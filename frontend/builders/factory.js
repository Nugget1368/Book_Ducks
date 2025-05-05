import { BookBuilder } from "./bookBuilder.js";
export class Factory{
    static buildBookCard(book) {
        let builder = new BookBuilder(book.documentId);
        builder.setTitle(book.title).setAuthor(book.author).setDescription(book.description).setImage(book.image.url).setPages(book.pages).setReleaseDate(book.releaseDate);
        return builder.build();
    }
}