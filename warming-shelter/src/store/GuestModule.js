import GuestService from "../services/GuestService.js";

const guests = JSON.parse(localStorage.getItem('guests'));

const initialState = {
    guests: JSON.parse(localStorage.getItem('guests')) || null,
    errorMessage: ''
}

export const guestModule = {
    name: 'guests',
    namespaced: true,
    state: initialState,
    actions: {
        async getAll({ commit }){
            try{
                const guests = await GuestService.getAll();
                commit('getAllSuccess', guests);
                return Promise.resolve(guests);
            } catch(error){
                commit('getAllGuestsFailure');
                return Promise.reject(error);
            }
        },
        async viewProfile({ commit }, { id }){
            try{
                const profile = await GuestService.viewProfile(id);
                commit('viewProfileSuccess', profile);
                return Promise.resolve(profile);
            } catch(error){
                commit('viewProfileFailure')
                return Promise.reject(error);
            }
        },
        async getCurrent({ commit }){
            try{
                const guests = await GuestService.getCurrent();
                commit('getAllSuccess', guests);
                return Promise.resolve(guests);
            } catch(error){
                commit('getAllGuestsFailure');
                return Promise.reject(error);
            }
        },
        async updateProfile({ commit }, payload){
            const { id, profile } = payload;
            try{
                const res = await GuestService.updateGuest(id, profile);
                commit('updateSuccess', res);
                return Promise.resolve(res);
            } catch(error){
                commit('updateFailure')
                return Promise.reject(error);
            }
        },
        async makeNewGuest({ commit }, payload){
            const { profile } = payload
            try{
                const res = await GuestService.newGuest(profile);
                commit('newSuccess', res);
                return Promise.resolve(res);
            } catch(error){
                commit('newFailure')
                return Promise.reject(error);
            }
        },
        async getReservation({ commit }){
            try{
                const guests = await GuestService.getReservation();
                commit('getReservationSuccess', guests);
                return Promise.resolve(guests);
            } catch(error){
                commit('getReservationFailure');
                return Promise.reject(error);
            }
        }
    },
    mutations: {
        getAllSuccess(state, guests) {
            state.guests = guests;
            state.errorMessage = '';
        },
        getAllGuestsFailure(state){
            state.guests = null;
            state.error = 'Unable to retrieve all guests from database'
        },
        viewProfileSuccess(state, profile) {
            state.profile = profile;
            state.errorMessage = '';
        },
        viewProfileFailure(state){
            state.profile = null;
            state.error = 'Unable to retrieve guest profile'
        },
        updateSuccess(state, res){
            state.profile = res
            state.errorMessage = '';
        },
        updateFailure(state){
            state.profile = null;
            state.errorMessage = 'Unable to update guest profile';
        },
        newSuccess(state, res){
            state.profile = res
            state.errorMessage = '';
        },
        newFailure(state){
            state.profile = null;
            state.errorMessage = 'Unable to make new guest object';
        },
        getReservationSuccess(state, res){
            state.guests = res;
            state.errorMessage = ''
        },
        getReservationFailure(state){
            state.guests = null;
            state.errorMessage = 'Unable to retrieve bunk reservations'
        }
    }
}