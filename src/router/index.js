import Vue from 'vue'
import Router from 'vue-router'

import MyMain from '@/views/main/Main.vue'
import Login from '@/views/login/Login.vue'
import Register from '@/views/register/Register.vue'
import Charts from '@/views/charts/Charts.vue'
import UpLoad from '@/views/upload/UpLoad.vue'
import store from '@/store'
import api from '@/http/api'

Vue.use(Router)

const router = new Router({
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
	  { path: '*', redirect: '/login' },

  ]
})

router.beforeEach((to, from, next) => {
  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。
  //let token = Cookies.get('token')
  let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
  let userName = userInfo && userInfo.username
  if (to.path === '/login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if(userName) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (!userName&&to.path!='/register') {
      // 如果访问非登录界面且不是注册，且户会话信息不存在，代表未登录，则跳转到登录界面
      next({ path: '/login' })
    } else {
      // 加载动态菜单和路由
      addDynamicMenuAndRoutes(userName, to, from)
      next()
    }
  }
})

/**
* 加载动态菜单和路由
*/
function addDynamicMenuAndRoutes(userName, to, from) {
  // 处理IFrame嵌套页面
  //handleIFrameUrl(to.path)
  // if(store.state.app.menuRouteLoaded) {
  //   console.log('动态菜单和路由已经存在.')
  //   return
  // }
  api.menu.findNavTree({'userName':userName})
  .then(res => {

    // 保存加载状态
    store.commit('menuRouteLoaded', true)
    // 保存菜单树
    store.commit('setNavTree', res.data)
    console.log("sss==="+JSON.stringify(res.data))
  })
  .catch(function(res) {
  })
}



export default router
