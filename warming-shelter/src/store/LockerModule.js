import LockerService from "../services/LockerService";

const lockers = JSON.parse(localStorage.getItem('locker'));

const initialState = {
    guests: JSON.parse(localStorage.getItem('locker')) || null,
    errorMessage: ''
}

export const lockerModule = {
    name: 'locker',
    namespaced: true,
    state: initialState,
    actions: {
        async updateLocker({ commit }, payload){
            const { number, name } = payload;
            try{
                const res = await LockerService.updateLocker(number, name);
                commit('updateSuccess', res);
                return Promise.resolve(res);
            } catch(error){
                commit('updateFailure')
                return Promise.reject(error);
            }
        },
        async getAll({ commit }){
            try{
                const lockers = await LockerService.getAll();
                commit('getAllSuccess', lockers);
                return Promise.resolve(lockers);
            } catch(error){
                commit('getAllFailure');
                return Promise.reject(error);
            }
        },
    },
    mutations: {
        updateSuccess(state, res){
            state.lockers = res
            state.errorMessage = '';
        },
        updateFailure(state){
            state.lockers = null;
            state.errorMessage = 'Unable to update locker';
        },
        getAllSuccess(state, lockers) {
            state.lockers = lockers;
            state.errorMessage = '';
        },
        getAllGuestsFailure(state){
            state.lockers = null;
            state.error = 'Unable to retrieve all lockers from database'
        }
    }
}