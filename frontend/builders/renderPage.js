export class RenderPageBuilder {
    static renderIndex() {
        this.resetDOM();
        let main = document.createElement("main");
        main.innerHTML = `  <header></header>
        <section class="books">
        </section>`
        document.querySelector("body > header").after(main);
    }

    static renderProfile() {
        this.resetDOM();
        let div = document.createElement("div");
        div.classList.add("row");
        div.innerHTML = `
        <aside class="speech-bubble">
            <header>
                <h2>My Profile</h2>
            </header>
            <section id="profile"></section>
        </aside>
        <main>
            <header class="comic-bubble">
                <h2>My Library</h2>
            </header>
            <select id="sort" name="sort">
            <option value="default">Sort...</option>
                <option value="title-up">Title (A-Z)</option>
                <option value="title-down">Title Down (Z-A)</option>
                <option value="author-up">Author Up (A-Z)</option>
                <option value="author-down">Author Down (Z-A)</option>
            </select>
            <section class="books">
            </section>
    </main>
    <footer></footer>`;
        document.querySelector("body > header").after(div);
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