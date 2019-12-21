import axios from 'axios'
import * as firebase from "firebase/app";
import "firebase/auth";
import router from '../router';

export default {
    state: {
        isLoggedIn: false
    },
    getters:{
        isLoggedIn: state => state.isLoggedIn
    },
    mutations: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        }
    },
    actions: {
        async setIdToken({ commit, dispatch }) {
            try {
                const idToken = await firebase.auth().currentUser.getIdToken();
                console.log(idToken);
                axios.defaults.headers.common['Authorization'] = idToken;
                commit("login");
                router.push({ name: 'home' })
            }
            catch{
                dispatch('logout');
            }
        },
        async logout({ commit }) {
            await firebase.auth().signOut();
            delete axios.defaults.headers.common['Authorization'];
            router.push({ name: 'home' })
            commit('logout');
        }
    }
}