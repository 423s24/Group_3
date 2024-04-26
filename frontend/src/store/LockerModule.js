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
        async getNumbers({ commit }){
            try{
                const lockers = await LockerService.getNumbers();
                console.log(lockers);
                commit('getNumberSuccess', lockers);
                return Promise.resolve(lockers);
            } catch(error){
                commit('getNumberFailure');
                return Promise.reject(error);
            }
        }
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
        getAllFailure(state){
            state.lockers = null;
            state.errorMessage = 'Unable to retrieve all lockers from database'
        },
        getNumberSuccess(state, lockers) {
            state.lockers = lockers;
            state.errorMessage = '';
        },
        getNumberFailure(state) {
            state.lockers = null;
            state.errorMessage = 'Unable to retrieve lockers number from database'
        },
        getAll(state) {
            state.lockers = lockers;
        }
    }
}