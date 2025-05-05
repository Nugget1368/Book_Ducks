import { API } from "./api.js";

export class Library{
    static async getBooks(){
        let response = await axios.get(API.getApiUrl() + '/books?populate=*');
        return response.data;
    }

    static async getBook(id = ""){
        let response = await axios.get(API.getApiUrl() + '/books/' + id);
        return response.data;
    }
    static async getRatings(){
        let response = await axios.get(API.getApiUrl() + '/ratings');
        return response.data;
    }
    static async getRating(id = ""){
        let response = await axios.get(API.getApiUrl() + '/ratings/' + id);
        return response.data;
    }

    static async updateRating(id = "", ratings = {}){
        let data = {
            data:{
                ratings
            }
        }
        //TODO: Add validation Token :)
        let response = await axios.put(API.getApiUrl() + '/ratings/' + id, data);
        return response.data;
    }


}