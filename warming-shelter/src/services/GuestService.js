import axios from 'axios';

const API_URL = 'http://localhost:8000/api/guests';

class GuestService {
    static guests = null;

    constructor(){
    }

    async getAll(){
        const res = await axios.get(API_URL + '/all');
        if (res.status === 200) {
            localStorage.setItem('guests', JSON.stringify(res.data));
            this.guests = res.data;
        }

        return res.data;
    }

    async viewProfile(id){
        try {
            const res = await axios.get(`${API_URL}/viewProfile/${id}`);
            
            if (res.status === 200) {
                localStorage.setItem('profile', JSON.stringify(res.data));
                this.profile = res.data;
            }
    
            return res.data;
        } catch (error) {
            console.error("Error fetching profile:", error);
            throw error; // Rethrow the error for further handling, or handle it appropriately.
        }
    }

    async getCurrent(){
        const res = await axios.get(API_URL + '/current');
        if (res.status === 200) {
            localStorage.setItem('guests', JSON.stringify(res.data));
            this.guests = res.data;
        }

        return res.data;
    }

}

export default new GuestService();