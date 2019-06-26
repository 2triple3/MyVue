import Vue from 'vue'
import Router from 'vue-router'

import MyMain from '@/views/main/Main.vue'
import Login from '@/views/login/Login.vue'
import Register from '@/views/register/Register.vue'
import Charts from '@/views/charts/Charts.vue'
import UpLoad from '@/views/upload/UpLoad.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
  { path:'/login', component:Login },
  { path:'/register', component:Register },
  {
    path:'/',
    name: 'MyMain',
    component: MyMain,
    // children: [
	   //  {
	   //    path: '',
	   //    component: Charts
	   //  },{
	   //    path: 'upload',
	   //    component: UpLoad
	   //  },{
	   //    path: 'charts1',
	   //    component: Charts
	   //  },{
	   //    path: 'charts2',
	   //    component: Charts
	   //  },{
	   //    path: 'charts3',
	   //    component: Charts
	   //  }
    // ]
  },
  { path: '*', redirect: '/login' }

  ]
})
