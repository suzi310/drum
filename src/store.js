import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            userName: ''
        },
        currentSong: {
            name: '',
            url: '',
            author: ''
        },
    },
    mutations: {
        selectSong(state, song){
            state.currentSong = song;
        },
        setUserName(state, name){
            state.user.userName = name;
        }
    },
    actions: {}
});
