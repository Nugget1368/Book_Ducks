import { API } from "./api.js";
import { Auth } from "../auth/auth.js";

export class Library {
    constructor() {
        this.books = [];
        this.ratings = [];
    }
    async setBooks() {
        let response = await axios.get(API.getApiUrl() + '/books?populate=*');
        if (response.status === 200) {
            this.books = response.data.data;
        }
        return this;
    }

    async setRatings() {
        let response = await axios.get(API.getApiUrl() + '/ratings' + '?populate=ratings&populate=book');
        if (response.status === 200) {
            this.ratings = response.data.data;
        }
        return this;
    }

    async getBook(id = "") {
        /// TODO: Edit this
        // let response = await axios.get(API.getApiUrl() + '/books/' + id + "?populate=users");
        // return response.data.data;
    }

    async getRating(id = "") {
        /// TODO: Edit this
        // let response = await axios.get(API.getApiUrl() + '/ratings/' + id);
        // return response.data;
    }

    async updateRating(id = "", newRating = { value: 0, profileId: "" }) {
        // Input: await this.library.updateRating("phjlv9iyc54nn9mc7mko0f79", { value: 4, profileId: this.profile.id });
        let rating = this.ratings.find(rating => rating.documentId === id);
        rating.ratings = rating.ratings.map(rating => { return { value: rating.value, profileId: rating.profileId } });
        rating.ratings.push(newRating)
        let total = 0;
        for (let i = 0; i < rating.ratings.length; i++) {
            total += rating.ratings[i].value;
        }
        rating.average = Math.round((total / rating.ratings.length) * 10) / 10;
        let data = {
            data: {
                average: rating.average,
                ratings: rating.ratings
            }
        }
        console.log("Data", data);
        try {
            let response = await axios.put(API.getApiUrl() + '/ratings/' + id, data, {
                headers: {
                    Authorization: `Bearer ${Auth.getToken()}`
                }
            });
            console.log("Response", response.data);
            return response.data;
        }
        catch (e) {
            console.log(e);
            return false;
        }

    }


}