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
    { path: '*', redirect: '/login' },
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
  api.menu.findNavTree({'userName':userName}).then(res => {
    // 保存加载状态
    store.commit('menuRouteLoaded', true)
    // 保存菜单树
    store.commit('setNavTree', res.data)
    console.log("后台获取的菜单树数据==="+JSON.stringify(res.data))
  })
  .catch(function(res) {
      //不与后端交互的时候
      if(userName=="admin"){
        //json字符串转json对象
        let tmp = JSON.parse('[{"id":1,"createBy":null,"createTime":null,"lastUpdateBy":null,"lastUpdateTime":null,"parentId":0,"name":"系统管理","url":null,"method":null,"perms":null,"type":0,"icon":"el-icon-setting","orderNum":0,"delFlag":0,"parentName":null,"level":0,"children":[{"id":2,"createBy":null,"createTime":null,"lastUpdateBy":null,"lastUpdateTime":null,"parentId":1,"name":"用户管理","url":"/sys/user","method":"","perms":null,"type":1,"icon":"el-icon-service","orderNum":1,"delFlag":0,"parentName":"系统管理","level":1,"children":[{"id":45,"createBy":null,"createTime":null,"lastUpdateBy":null,"lastUpdateTime":null,"parentId":2,"name":"用户列表","url":null,"method":"userList","perms":null,"type":1,"icon":null,"orderNum":1,"delFlag":0,"parentName":"用户管理","level":2,"children":[]}]},{"id":3,"createBy":null,"createTime":null,"lastUpdateBy":null,"lastUpdateTime":null,"parentId":1,"name":"机构管理","url":"/sys/dept","method":"deptList","perms":null,"type":1,"icon":"el-icon-news","orderNum":2,"delFlag":0,"parentName":"系统管理","level":1,"children":[]},{"id":4,"createBy":null,"createTime":null,"lastUpdateBy":null,"lastUpdateTime":null,"parentId":1,"name":"角色管理","url":"/sys/role","method":"roleList","perms":null,"type":1,"icon":"el-icon-view","orderNum":4,"delFlag":0,"parentName":"系统管理","level":1,"children":[]},{"id":5,"createBy":null,"createTime":null,"lastUpdateBy":null,"lastUpdateTime":null,"parentId":1,"name":"菜单管理","url":"/sys/menu","method":"menuList","perms":"","type":1,"icon":"el-icon-menu","orderNum":5,"delFlag":0,"parentName":"系统管理","level":1,"children":[]},{"id":8,"createBy":null,"createTime":null,"lastUpdateBy":null,"lastUpdateTime":null,"parentId":1,"name":"系统日志","url":"/sys/log","method":null,"perms":"sys:log:view","type":1,"icon":"el-icon-info","orderNum":8,"delFlag":0,"parentName":"系统管理","level":1,"children":[]}]},{"id":44,"createBy":"admin","createTime":"2018-12-27T11:05:48.000+0000","lastUpdateBy":"admin","lastUpdateTime":"2018-12-27T11:06:39.000+0000","parentId":0,"name":"服务治理","url":"","method":null,"perms":"","type":0,"icon":"el-icon-service","orderNum":2,"delFlag":0,"parentName":null,"level":0,"children":[{"id":41,"createBy":"admin","createTime":"2018-11-03T11:06:48.000+0000","lastUpdateBy":"admin","lastUpdateTime":"2018-12-27T11:08:11.000+0000","parentId":44,"name":"注册中心","url":"http://139.196.87.48:8500","method":null,"perms":"","type":1,"icon":" el-icon-view","orderNum":0,"delFlag":0,"parentName":"服务治理","level":1,"children":[]}]},{"id":35,"createBy":null,"createTime":null,"lastUpdateBy":"admin","lastUpdateTime":"2018-12-27T11:04:18.000+0000","parentId":0,"name":"接口文档","url":"http://139.196.87.48:8001/swagger-ui.html","method":"","perms":null,"type":1,"icon":"el-icon-document","orderNum":3,"delFlag":0,"parentName":null,"level":0,"children":[]}]');
        // 保存加载状态
        store.commit('menuRouteLoaded', true)
        // 保存菜单树
        store.commit('setNavTree', tmp)
      }
  })
}



export default router
