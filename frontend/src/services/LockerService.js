import axios from 'axios';

const API_URL = 'http://localhost:8000/api/lockers';

const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

const updateLocker = async (number, name) => {
    try {

        const res = await axios.put(`${API_URL}/update`, { number: number, name: name }, { headers: getAuthHeaders() });

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

const getAll = async () => {
    const res = await axios.get(API_URL + '/all', { headers: getAuthHeaders() });
    if (res.status === 200) {
        localStorage.setItem('locker', JSON.stringify(res.data));
        this.locker = res.data;
    }

    return res.data;
}

const getNumbers = async () => {
    const res = await axios.get(API_URL + '/numbers', { headers: getAuthHeaders() });
    if (res.status === 200) {
        localStorage.setItem('locker', JSON.stringify(res.data));
        this.locker = res.data;
        console.log(this.locker)
    }

    return res.data;
}

const LockerService = {
    updateLocker,
    getAll,
    getNumbers
}

export default LockerService;