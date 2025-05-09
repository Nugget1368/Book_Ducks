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

    static renderProfileAside(){
        let aside = document.createElement("aside");
        aside.classList.add("speech-bubble");
        aside.innerHTML = `
        <header>
            <h2>My Profile</h2>
        </header>
        <section id="profile"></section>
        `;
        document.querySelector("body > div.row").prepend(aside);
    }

    static renderSelect(){
        let select = document.createElement("select");
        select.id = "sort";
        select.name = "sort";
        select.innerHTML = `
        <option value="default">Sort...</option>
        <option value="title-up">Title (A-Z)</option>
        <option value="title-down">Title Down (Z-A)</option>
        <option value="author-up">Author Up (A-Z)</option>
        <option value="author-down">Author Down (Z-A)</option>
        `;
        document.querySelector("section.books").prepend(select);
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