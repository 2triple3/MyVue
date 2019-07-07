import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

import app from './modules/app'
import tab from './modules/tab'
import iframe from './modules/iframe'
import user from './modules/user'
import menu from './modules/menu'

const store = new vuex.Store({
    modules: {
        app: app,
        tab: tab,
        iframe: iframe,
        user: user,
        menu: menu
    },
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