import { API } from "./api.js";
const THEME_KEY = "theme";
export class Theme {
    static async getTheme() {
        if (sessionStorage.getItem(THEME_KEY)) {
            document.querySelector("body").setAttribute("theme", sessionStorage.getItem(THEME_KEY));
            return
        }
        try {
            let response = await axios.get(API.getApiUrl() + "/book-store");
            if (response.status === 200 && response.data.data.theme != null && response.data.data.theme != undefined) {
                let theme = response.data.data.theme;
                sessionStorage.setItem(THEME_KEY, theme);
                document.querySelector("body").setAttribute("theme", theme);
                return
            }
        }
        catch (e) {
            sessionStorage.setItem(THEME_KEY, "classic");
            document.querySelector("body").setAttribute("theme", "classic");
            return
        }
        sessionStorage.setItem(THEME_KEY, "classic");
        document.querySelector("body").setAttribute("theme", "classic");
    }
}