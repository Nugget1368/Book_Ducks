import { API } from "./api.js";

export class Theme {
    static async getTheme() {
        try {
            let response = await axios.get(API.getApiUrl() + "/book-store");
            if (response.status === 200 && response.data.data.theme != null && response.data.data.theme != undefined) {
                let theme = response.data.data.theme;
                document.querySelector("body").setAttribute("theme", theme);
                return
            }
        }
        catch (e) {
            console.log(e);
            document.querySelector("body").setAttribute("theme", "classic");
            return
        }
        document.querySelector("body").setAttribute("theme", "classic");
    }
}