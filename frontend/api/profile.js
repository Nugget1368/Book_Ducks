import { Auth } from "../auth/auth.js";
import { UserBuilder } from "../builders/userBuilder.js";
import { API } from "./api.js";

export class Profile extends UserBuilder{
    async addToLibrary(bookId = 0){
        try{
            this.library.push(bookId)
            let data = {
                library: this.library
            };
            let response = await axios.put(`${API.getApiUrl()}/users/${this.id}`, data, {
                headers: {
                    Authorization: `Bearer ${Auth.getToken()}`
                }
            });
            return response.data;
        }
        catch(e){
            return {};
        }
    }
}