import axios from 'axios';

const API_URL = 'http://localhost:8000/api/lockers';

class LockerService {
    static locker = null

    constructor(){
    }

    async updateLocker(number, name){
        try {
        
            const res = await axios.put(`${API_URL}/update`, { number: number, name: name });
            
            if (res.status === 200) {
                localStorage.setItem('locker', JSON.stringify(res.data));
                this.locker = res.data;
            }
            return res.data;
        } catch (error) {
            console.error("Error updating locker:", error);
            throw error; 
        }
    }

    async getAll(){
        const res = await axios.get(API_URL + '/all');
        if (res.status === 200) {
            localStorage.setItem('locker', JSON.stringify(res.data));
            this.locker = res.data;
        }

        return res.data;
    }

    async getNumbers(){
        const res = await axios.get(API_URL + '/numbers');
        if (res.status === 200) {
            localStorage.setItem('locker', JSON.stringify(res.data));
            this.locker = res.data;
            console.log(this.locker)
        }

        return res.data;
    }
}

export default new LockerService();