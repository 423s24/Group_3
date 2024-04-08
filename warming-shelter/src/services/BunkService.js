import axios from 'axios';

const API_URL = 'http://localhost:8000/api/bunks';

class BunkService {
    static bunk = null

    constructor(){
    }

    async updateBunk(number, name){
        try {
            // console.log("number:" + number)
            // console.log("name:" + name)
            const res = await axios.put(`${API_URL}/update`, { number: number, name: name });
            
            if (res.status === 200) {
                localStorage.setItem('bunk', JSON.stringify(res.data));
                this.bunk = res.data;
            }
            return res.data;
        } catch (error) {
            console.error("Error updating bunk:", error);
            throw error; 
        }
    }

    async getAll(){
        const res = await axios.get(API_URL + '/all');
        if (res.status === 200) {
            localStorage.setItem('bunk', JSON.stringify(res.data));
            this.bunk = res.data;
        }

        return res.data;
    }
}

export default new BunkService();