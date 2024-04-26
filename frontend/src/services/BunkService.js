import axios from 'axios';

const API_URL = 'http://localhost:8000/api/bunks';
// const API_URL = 'https://hrdc-api-six.vercel.app/api/bunks';

const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

const updateBunk = async (number, name) => {
    try {
        const res = await axios.put(`${API_URL}/update`, { number: number, name: name }, { headers: getAuthHeaders() });
        return res.data;
    } catch (error) {
        console.error("Error updating bunk:", error);
        throw error;
    }
}

const getAll = async () => {
    const res = await axios.get(API_URL + '/all', { headers: getAuthHeaders() });
    return res.data;
}

const getNumbers = async () => {
    const res = await axios.get(API_URL + '/numbers', { headers: getAuthHeaders() });
    if (res.status === 200) {
        localStorage.setItem('bunk', JSON.stringify(res.data));
        console.log(res.data)
    }

    return res.data;
}

const BunkService = {
    updateBunk,
    getAll,
    getNumbers
}

export default BunkService;