import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
//import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    //permission,
    tagsView,
    user
  },
  getters,

  state:{
    userInfo: {
      userName: '李武帝',
      password: 123456
    },
    num: 0
  },

  mutations: {
    add: function (state) {
      state.num++
    },
    dec: function (state) {
      state.num--;
    }
  }
  
})

export default store
