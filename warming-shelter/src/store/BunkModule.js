import BunkService from "../services/BunkService";

const bunks = JSON.parse(localStorage.getItem('bunk'));

const initialState = {
    guests: JSON.parse(localStorage.getItem('bunk')) || null,
    errorMessage: ''
}

export const bunkModule = {
    name: 'bunk',
    namespaced: true,
    state: initialState,
    actions: {
        async updateBunk({ commit }, payload){
            const { number, name } = payload;
            try{
                const res = await BunkService.updateGuest(number, name);
                commit('updateSuccess', res);
                return Promise.resolve(res);
            } catch(error){
                commit('updateFailure')
                return Promise.reject(error);
            }
        },
        async getAll({ commit }){
            try{
                const bunks = await BunkService.getAll();
                commit('getAllSuccess', bunks);
                return Promise.resolve(bunks);
            } catch(error){
                commit('getAllGuestsFailure');
                return Promise.reject(error);
            }
        },
    },
    mutations: {
        updateSuccess(state, res){
            state.bunk = res
            state.errorMessage = '';
        },
        updateFailure(state){
            state.bunk = null;
            state.errorMessage = 'Unable to update guest profile';
        },
        getAllSuccess(state, bunks) {
            state.bunks = bunks;
            state.errorMessage = '';
        },
        getAllGuestsFailure(state){
            state.bunks = null;
            state.error = 'Unable to retrieve all guests from database'
        }
    }
}