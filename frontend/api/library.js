import { API } from "./api.js";
import { Auth } from "../auth/auth.js";

export class Library {
    constructor() {
        this.books = [];
        this.ratings = [];
        this.ratedBooks = [];
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

    getRating(bookid = "") {
        /// TODO: Edit this
        let rating = this.ratings.find(rating => rating.bookId === this.book.id);
        return rating;
    }

    setUserRatings(profileId = "") {
        let ratings = this.ratings.filter(rating => rating.ratings.find(r => r.profileId === profileId));
        ratings.forEach(r =>{
            console.log(r);
            this.ratedBooks.push({
                book: r.book,
                rating: r.ratings.find(rb => rb.profileId === profileId)
            })
        });
        /// User this
        // let userRatings = ratings.map(rating => rating.ratings.find(r => r.profileId === profileId));
        return this;
    }

    async updateRating(id = "", newRating = { value: 0, profile: this.profile.id, profileId: this.profile.id }) {
        /// TODO: Edit this
        let rating = this.ratings.find(rating => rating.documentId === id);
        let newprofile = true;
        if (rating.ratings.find(r => r.profileId === newRating.profileId)) {
            newprofile = false;
        }
        rating.ratings = rating.ratings.map(r => {
            if (r.profileId === newRating.profileId) {
                return rating.ratings[rating.ratings.indexOf(r)] = {
                    value: newRating.value,
                    profileId: newRating.profileId,
                    profile: newRating.profile
                };
            }
            else {
                return {
                    value: r.value,
                    profileId: r.profileId,
                    profile: r.profile.documentId
                };
            }
        });
        if (newprofile) {
            rating.ratings.push(newRating)
        }
        let total = 0;
        for (let i = 0; i < rating.ratings.length; i++) {
            total += rating.ratings[i].value;
        }
        rating.average = Math.round((total / rating.ratings.length) * 10) / 10;

        this.ratings = this.ratings.filter(rating => rating.documentId !== id);
        this.ratings.push(rating);
        let data = {
            data: {
                average: rating.average,
                ratings: rating.ratings
            }
        }
        try {
            let response = await axios.put(API.getApiUrl() + '/ratings/' + id, data, {
                headers: {
                    Authorization: `Bearer ${Auth.getToken()}`
                }
            });
            return response.data;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
}