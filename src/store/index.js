// store/index.js
 
import Vue from "vue";
import Vuex from "vuex";
 
Vue.use(Vuex);
 
export default new Vuex.Store({
 state: {
        lastSong: null
 },
 getters: {
    getSong: state => {
        return state.lastSong;
      }
 },
 mutations: {
    changeSong (state, payload) {
        state.lastSong = payload
      }
 },
 actions: {}
});