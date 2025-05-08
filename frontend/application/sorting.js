export class Sorting{
    static sortTitleUp(books = []){
        books.sort((a, b) => a.title.localeCompare(b.title));
    }

    static sortTitleDown(books = []){
        books.sort((a, b) => b.title.localeCompare(a.title));
    }

    static sortAuthorUp(books = []){
        books.sort((a, b) => a.author.localeCompare(b.author));
    }

    static sortAuthorDown(books = []){
        books.sort((a, b) => b.author.localeCompare(a.author));
    }
}