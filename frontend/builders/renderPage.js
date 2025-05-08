export class RenderPageBuilder {
    static renderIndex(){
        this.resetDOM();
        let main = document.createElement("main");
        main.innerHTML = `  <header></header>
        <section class="books">
        </section>`
        document.querySelector("body > header").after(main);
    }

    static renderProfile(){
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
        <section class="books">
        </section>
    </main>
    <footer></footer>`;
    document.querySelector("body > header").after(div);
    }

    static resetDOM(){
        let oldmain = document.querySelector("main");
        let divrow = document.querySelector("body > div.row");
        if(oldmain != null){
            oldmain.remove();
        }
        if(divrow != null){
            divrow.remove();
        }
    }
}