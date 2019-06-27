// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import i18n from './i18n'

import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

import $ from 'jquery';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'

//登录页用到的flex等样式
import './assets/css/styles/common.scss' // global css

//按钮上的图标等
import 'font-awesome/css/font-awesome.min.css'
//import '@/assets/css/iconfont/iconfont.css'


import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
//Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
