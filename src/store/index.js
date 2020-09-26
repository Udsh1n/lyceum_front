import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      g: '',
        isAuth: false,
        nickname: '',
        score: null,

    },
    mutations:{
        auth(state, payload){
            state.isAuth = true
            state.nickname = payload.name
            state.score = payload.score
        },
        logout(state){
            state.isAuth = false
            state.nickname = ''
            state.score = null
        }
    }
})

export default store