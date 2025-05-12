export class RenderPageBuilder {
    static renderIndex() {
        this.resetDOM();
        let main = document.createElement("main");
        main.innerHTML = `  <header></header>
        <section class="books">
            <div class="content"></div>
        </section>`
        document.querySelector("body > header").after(main);
    }

    static renderProfile() {
        this.resetDOM();
        let div = document.createElement("div");
        div.classList.add("row");
        div.innerHTML = `
        <main>
            <header class="comic-bubble">
                <h2>My Library</h2>
            </header>
            <section class="books">
                <div class="content"></div>
            </section>
    </main>
    `;
        document.querySelector("body > header").after(div);
    }

    static renderProfileAside(username = "", email = "") {
        let aside = document.createElement("aside");
        aside.classList.add("speech-bubble");
        aside.innerHTML = `
        <header>
            <h2>My Profile</h2>
        </header>
        <section id="profile">
            <article>
                <p><b>Username:</b> ${username}</p>
                <p><b>Email:</b> ${email}</p>
            </article >
        </section >
            `;
        document.querySelector("body > div.row").prepend(aside);
    }

    static renderMyRatedBooks() {
        let myRatedBooks = document.createElement("article");
        myRatedBooks.id = "my-rated-books";
        let myRatedBooksHeader = document.createElement("h3");
        myRatedBooksHeader.textContent = "Your Ratings";
        let select = RenderPageBuilder.renderSelectRatings();
        myRatedBooks.append(myRatedBooksHeader, select);
        return myRatedBooks;
    }

    static renderSelect() {
        let select = document.createElement("select");
        select.id = "sort";
        select.name = "sort";
        select.innerHTML = `<option value="default">Sort...</option>
        <option value="title-up">Title (A-Z)</option>
        <option value="title-down">Title Down (Z-A)</option>
        <option value="author-up">Author Up (A-Z)</option>
        <option value="author-down">Author Down (Z-A)</option>`;
        document.querySelector("section.books").prepend(select);
    }

    static renderSelectRatings() {
        let select = document.createElement("select");
        select.id = "sort-ratings";
        select.name = "sort-ratings";
        select.innerHTML = `
        <option value="default">Sort...</option>
        <option value="title-up">Title (A-Z)</option>
        <option value="title-down">Title Down (Z-A)</option>
        <option value="author-up">Author Up (A-Z)</option>
        <option value="author-down">Author Down (Z-A)</option>
        <option value="rating-up">Rating Up</option>
        <option value="rating-down">Rating Down</option>
        `;
        return select;
    }

    static resetDOM() {
        let oldmain = document.querySelector("main");
        let divrow = document.querySelector("body > div.row");
        if (oldmain != null) {
            oldmain.remove();
        }
        if (divrow != null) {
            divrow.remove();
        }
    }
}