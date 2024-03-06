import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users';

class AuthService {
    static isAuthenticated = false;
    static user = null;

    constructor() {
    }

    async login(username, password) {
        const body = {
            username: username,
            password: password
        }

        const res = await axios.post(API_URL + '/login', body);

        if (res.status === 200) {
            localStorage.setItem('user', JSON.stringify(res.data));
            this.isAuthenticated = true;
            this.user = res.data;
        }

        return res.data;
    }

    async logout() {
        localStorage.removeItem('user');
        const res = await axios.get(API_URL + '/logout');

        if(res.status === 200){
            this.isAuthenticated = false;
            this.user = null;
        }

        return res.data;
    }

    createNewUser(user){}

    updateUser(user){}
}

export default new AuthService();