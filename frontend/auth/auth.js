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

    static async getUser() {
        try {
            let response = await axios.get(`${API.getApiUrl()}/users/me?populate=profile`,
                {
                    headers:
                        { Authorization: `Bearer ${sessionStorage.getItem(USER_TOKEN)}` }
                }
            );
            console.log(response.data);
            if (response.status === 200)
                return response.data.profile;
        }
        catch (e) {
            console.log(e);
            return {};
        }
        return {};
    }

    static async createProfile(user) {
        try {
            let profile = await axios.post(`${API.getApiUrl()}/profiles`, {
                data: {
                    email: user.email,
                    username: user.username,
                    user: user.id,
                    library: []
                }
            }, {
                headers: {
                    Authorization: `Bearer ${Auth.getToken()}`
                }
            });
            if (profile.status === 201) {
                return true;
            }
        }
        catch (e) {
            console.log(e);
            return false;
        }
        return false;
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
                return {
                    success: true,
                    data: response.data
                };
            }
        }
        catch (e) {
            console.log(e);
            return {
                success: false,
                data: {}
            };
        }
        return {
            success: false,
            data: {}
        };
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