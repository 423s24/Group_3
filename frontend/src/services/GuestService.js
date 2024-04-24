import axios from 'axios';

const API_URL = 'http://localhost:8000/api/guests';

// Production URL: 
// const API_URL = 'https://hrdc-api-six.vercel.app/api/guests';

const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

const getAll = async () => {
    const res = await axios.get(API_URL + '/all', { headers: getAuthHeaders() });
    if (res.status === 200) {
        return res.data;
    } else {
        return null;
    }
};

const viewProfile = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/viewProfile/${id}`, { headers: getAuthHeaders() });
        if (res.status === 200) {
            return res.data;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

const getCurrent = async () => {
    const res = await axios.get(API_URL + '/current', { headers: getAuthHeaders() });
    if (res.status === 200) {
        return res.data;
    } else {
        return null;
    }
};

const updateGuest = async (id, profile) => {
    try {
        const res = await axios.put(`${API_URL}/update`, { id: id, profile: profile }, { headers: getAuthHeaders() });
        if (res.status === 200) {
            return res.data;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

const newGuest = async (profile) => {
    try {
        const res = await axios.post(`${API_URL}/new`, { profile: profile }, { headers: getAuthHeaders() });
        if (res.status === 200){
            return res.data;
        } else {
            return null;
        }
    } catch(error) {
        throw error;
    }
}

const getReservation = async () => {
    const res = await axios.get(API_URL + '/reservations', { headers: getAuthHeaders() });
    if (res.status === 200) {
        return res.data;
    } else {
        return null;
    }
};

const GuestService = {
    getAll,
    viewProfile,
    getCurrent,
    updateGuest,
    newGuest,
    getReservation
};

export default GuestService;
