import { Auth } from "../auth/auth.js";
import { UserBuilder } from "../builders/userBuilder.js";
import { API } from "./api.js";

export class Profile extends UserBuilder {
    async addToLibrary(bookId) {
        let newlibrary = this.library.map(book => book.documentId);
        newlibrary.push(bookId);
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
            if(response.status === 200)
                this.setLibrary(response.data.data.library);
            return response.data;
        }
        catch (e) {
            console.log(e);
            return {};
        }
    }
    async getLibrary() {
        try {
            let response = await axios.get(`${API.getApiUrl()}/profiles/${this.id}?populate=library`, {
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
}