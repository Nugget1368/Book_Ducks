import { API } from "../api/api.js";
const USER_TOKEN = "token";
export class Auth {
    static getToken() {
        return localStorage.getItem(USER_TOKEN);
    }
    static setToken(token) {
        localStorage.setItem(USER_TOKEN, token);
    }
    static removeToken() {
        localStorage.removeItem(USER_TOKEN);
    }
    static async isAuthenticated() {
        try{
            let response = await axios.get(`${API.getApiUrl()}/users/me`,
                {
                    headers:
                    { Authorization: `Bearer ${sessionStorage.getItem(USER_TOKEN)}` }
                }
            );
            return response.data;
        }
        catch(e){
            return false;
        }
    }

    static async register(user){
        try{
            let response = await axios.post(`${API.getApiUrl()}/auth/local/register`, {
                email: user.email,
                username: user.username,
                password: user.password
            });
            if (response.status === 200) {
                sessionStorage.setItem("token", response.data.jwt);
                return true;
            }
        }
        catch(e){
            return false;
        }
        return false;
    }
    static async login(){

    }
}