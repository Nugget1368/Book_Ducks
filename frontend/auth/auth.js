import { API } from "../api/api.js";
const USER_TOKEN = "token";
export class Auth {
    static getToken() {
        return sessionStorage.getItem(USER_TOKEN);
    }
    static setToken(token) {
        sessionStorage.setItem(USER_TOKEN, token);
    }
    static removeToken() {
        sessionStorage.removeItem(USER_TOKEN);
    }
    static async isAuthenticated() {
        try {
            let response = await axios.get(`${API.getApiUrl()}/users/me`,
                {
                    headers:
                        { Authorization: `Bearer ${sessionStorage.getItem(USER_TOKEN)}` }
                }
            );
            if (response.status === 200)
                return true;
        }
        catch (e) {
            return false;
        }
        return false;
    }

    static async getUsername() {
        try {
            let response = await axios.get(`${API.getApiUrl()}/users/me`,
                {
                    headers:
                        { Authorization: `Bearer ${sessionStorage.getItem(USER_TOKEN)}` }
                }
            );
            if (response.status === 200)
                return response.data.username;
        }
        catch (e) {
            return false;
        }
        return false;
    }

    static async getUser(){
        try {
            let response = await axios.get(`${API.getApiUrl()}/users/me?populate=library`,
                {
                    headers:
                        { Authorization: `Bearer ${sessionStorage.getItem(USER_TOKEN)}` }
                }
            );
            if (response.status === 200)
                return response.data;
        }
        catch (e) {
            return {};
        }
        return {};
    }

    static async register(user) {
        try {
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
        catch (e) {
            return false;
        }
        return false;
    }
    static async login(user) {
        try {
            const response = await axios.post(`${API.getApiUrl()}/auth/local`, {
                identifier: user.username ? user.username : user.email,
                password: user.password
            });
            if (response.status === 200) {
                sessionStorage.setItem("token", response.data.jwt);
                return true;
            }
        }
        catch (e) {
            return false;
        }
        return false;
    }
}