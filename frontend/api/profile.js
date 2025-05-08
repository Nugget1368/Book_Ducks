import { Auth } from "../auth/auth.js";
import { UserBuilder } from "../builders/userBuilder.js";
import { API } from "./api.js";

export class Profile extends UserBuilder {
    async addToLibrary(book = {}) {
        this.library.push(book);
        let newlibrary = this.library.map(book => book.documentId);
        try {
            let data = {
                data: {
                    library: newlibrary
                }
            };
            let response = await axios.put(`${API.getApiUrl()}/profiles/${this.id}?populate=library`, data, {
                headers: {
                    Authorization: `Bearer ${Auth.getToken()}`
                }
            });
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
    async getLibrary() {
        try {
            let response = await axios.get(`${API.getApiUrl()}/profiles/${this.id}?pLevel=3`, {
                headers: {
                    Authorization: `Bearer ${Auth.getToken()}`
                }
            });
            return response.data.data.library;
        }
        catch (e) {
            console.log(e);
            return [];
        }
    }

    async removeFromLibrary(bookId = "") {
        this.library = this.library.filter(book => book.documentId !== bookId);
        let newlibrary = this.library.map(book => book.documentId);
        try {
            let data = {
                data: {
                    library: newlibrary
                }
            };
            let response = await axios.put(`${API.getApiUrl()}/profiles/${this.id}?populate=library`, data, {
                headers: {
                    Authorization: `Bearer ${Auth.getToken()}`
                }
            });
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
}