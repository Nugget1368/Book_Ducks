const BASE_URL = 'http://localhost:1337';
const API_URL = 'http://localhost:1337/api';

export class API {
    static getApiUrl() {
        return API_URL;
    }
    static getBaseUrl() {
        return BASE_URL;
    }
}