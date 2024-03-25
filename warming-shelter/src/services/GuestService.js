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

    async updateGuest(id, profile){
        console.log("Profile in service", profile);
        try {
            const res = await axios.put(`${API_URL}/update`, { id: id, profile: profile });
            
            if (res.status === 200) {
                localStorage.setItem('profile', JSON.stringify(res.data));
                this.profile = res.data;
            }
    
            return res.data;
        } catch (error) {
            console.error("Error updating profile:", error);
            throw error; // Rethrow the error for further handling, or handle it appropriately.
        }
    }

    async newGuest(profile){
        try {
            const res = await axios.post(`${API_URL}/new`, { profile: profile });

            if (res.status == 200){
                console.log("made new guest object successfully")
                this.new = res.data
            }

            return res.data
        } catch(error) {
            console.error("Error creating new guest: ", error)
            throw error
        }
    }

}
export default new GuestService();