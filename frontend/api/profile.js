import { Auth } from "../auth/auth.js";
import { UserBuilder } from "../builders/userBuilder.js";
import { API } from "./api.js";

export class Profile extends UserBuilder {
    async addToLibrary(book = {}) {
        let bookids = book.users.map(user => user.documentId);
        bookids.push(this.id);
        try {
            let data = {
                data: {
                    users: bookids
                }
            };
            let response = await axios.put(`${API.getApiUrl()}/books/${book.documentId}`, data, {
                headers: {
                    Authorization: `Bearer ${Auth.getToken()}`
                }
            });
            return response.data;
        }
        catch (e) {
            console.log(e);
            return {};
        }
    }
}