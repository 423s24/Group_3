import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users';

const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return {'Authorization': 'Bearer ' + user.token};
    } else {
        return {};
    }
};

const loginUser = async (username, password) => {
    const body = {
        username: username,
        password: password
    };

    const res = await axios.post(API_URL + '/login', body);

    if (res.status === 200) {
        localStorage.setItem('user', JSON.stringify(res.data));
    }

    return res.data;
};

const logoutUser = async () => {
    localStorage.removeItem('user');
};

const createNewUser = async (user) => {
    console.log(user)
    const {isAdmin, firstName, lastName, username, password} = user;
    const body = {
        isAdmin: isAdmin,
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password
    };

    const res = await axios.post(API_URL + '/create', body, {headers: getAuthHeaders()});
    return res.data;
};

const deleteUser = async (id) => {
    const res = await axios.delete(API_URL + '/delete/' + id, {headers: getAuthHeaders()});

    return res.data;
};

const getAllUsers = async () => {
    const res = await axios.get(API_URL + '/all', {headers: getAuthHeaders()});

    return res.data;
}

const getUserDetails = async () => {
    const res = await axios.get(API_URL + '/details');

    return res.data;
}

const updateUser = async (user) => {
    const {isAdmin, firstName, lastName, username} = user;
    const body = {
        isAdmin: isAdmin,
        firstName: firstName,
        lastName: lastName,
        username: username,
    };

    const res = await axios.put(API_URL + `/update/${user._id}`, body, {headers: getAuthHeaders()});
    return res.data;
};


const UserService = {
    loginUser,
    logoutUser,
    createNewUser,
    deleteUser,
    getAllUsers,
    getUserDetails,
    updateUser
};

export default UserService;