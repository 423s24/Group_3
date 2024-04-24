import UserService from "../services/UserService.js";
import router from "../Router.js";

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    allUsers: [],
    feedbackMessage: '',
    errorMessage: '',
    selectedUser: null,
}

export const userModule = {
    name: 'user',
    namespaced: true,
    state: initialState,
    actions: {
        async loginUser({commit}, {username, password}) {
            try {
                const user = await UserService.loginUser(username, password);
                commit('loginSuccess', user);
                await router.push({path: '/dashboard'});
                return Promise.resolve(user);
            } catch (error) {
                commit('loginFailure');
                return Promise.reject(error);
            }
        },
        async logoutUser({commit}) {
            await UserService.logoutUser();
            commit('setUser', null);
            commit('logout');
        },

        async createNewUser({commit, state}, user) {
            try {
                await UserService.createNewUser(user);
                commit('setFeedbackMessage', 'User created successfully');
                commit('setAllUsers', [...state.allUsers, user]);
                return Promise.resolve(user);
            } catch (error) {
                commit('setErrorMessage', error.response.data.message);
                return Promise.reject(error);
            }
        },
        async deleteUser({commit}, id) {
            try {
                await UserService.deleteUser(id);
                commit('setFeedbackMessage', 'User deleted successfully');
            } catch (error) {
                commit('setErrorMessage', error.response.data.message);
            }
        },
        async getAllUsers({commit}) {
            try {
                const users = await UserService.getAllUsers();
                commit('setAllUsers', users);
            } catch (error) {
                commit('setErrorMessage', error.response.data.message);
            }
        },
        async getUserDetails({commit}) {
            try {
                const userDetails = await UserService.getUserDetails();
                commit('setUserDetails', userDetails);
            } catch (error) {
                commit('setErrorMessage', error.response.data.message);
            }
        },
        async updateUser({commit}, user) {
            try {
                await UserService.updateUser(user);
                commit('setFeedbackMessage', 'User updated successfully');
            } catch (error) {
                commit('setErrorMessage', "Error updating user");
            }
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.user = user;
            state.errorMessage = '';
        },
        loginFailure(state) {
            state.user = null;
            state.errorMessage = 'Invalid username or password';
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.errorMessage = '';
        },
        setFeedbackMessage(state, message) {
            state.feedbackMessage = message;
        },
        setErrorMessage(state, message) {
            state.errorMessage = message;
        },
        setUser(state, user) {
            state.user = user;
        },
        setAllUsers(state, users) {
            state.allUsers = users;
        },
        setUserDetails(state, userDetails) {
            state.selectedUser = userDetails;
        }
    }
}