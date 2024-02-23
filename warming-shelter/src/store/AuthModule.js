import AuthService from "../services/AuthService.js";
import router from "../Router.js";

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: AuthService.isAuthenticated,
    errorMessage: ''
}

export const authModule = {
    name: 'auth',
    namespaced: true,
    state: initialState,
    actions: {
        async login({ commit }, { username, password }) {
            try {
                const user = await AuthService.login(username, password);
                commit('loginSuccess', user);
                await router.push({ path: '/dashboard' });
                return Promise.resolve(user);
            } catch (error) {
                commit('loginFailure');
                return Promise.reject(error);
            }
        },

        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },

        async register({ commit }, user) {
            try {
                const res = await AuthService.createNewUser(user);
                commit('registerSuccess', res);
                return Promise.resolve(res);
            } catch (error) {
                commit('registerFailure');
                return Promise.reject(error);
            }
        },
        async update({ commit }, user) {
            try {
                const res = await AuthService.updateUser(user);
                commit('updateSuccess', res);
                return Promise.resolve(res);
            } catch (error) {
                commit('updateFailure');
                return Promise.reject(error);
            }
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.user = user;
            state.isAuthenticated = true;
            state.errorMessage = '';
        },
        loginFailure(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.errorMessage = 'Invalid username or password';
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.errorMessage = '';
        },
        registerSuccess(state, user) {
            state.user = user;
            state.isAuthenticated = true;
            state.errorMessage = '';
        },
        registerFailure(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.errorMessage = 'Username already exists';
        },
        updateSuccess(state, user) {
            state.user = user;
            state.isAuthenticated = true;
            state.errorMessage = '';
        },
        updateFailure(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.errorMessage = 'Error updating user';
        }
    }
}