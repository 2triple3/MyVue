<template>
  <div>
      <el-container>
        <el-aside width="200px">
            <el-menu :default-openeds="currMenu" @open="openMenu" unique-opened @select="handleMenuSelect">
                <menuTree :menuItemList="menuItemList" v-on:changeComponent="changeCurrentTabComponent"></menuTree> 
            </el-menu>
        </el-aside>

        <el-main>
            <breadcrumbNav :currentPath="breads"></breadcrumbNav>
            <br/>
            <component v-bind:is="currentTabComponent" v-on:changeComponent="changeCurrentTabComponent"></component>
        </el-main>

      </el-container>
      
  </div>
</template>

<script>
import { mapState } from 'vuex'
import menuTree from '../sys/MenuTree.vue';//菜单树不含根节点el-menu因为树内有递归
import breadcrumbNav from '../sys/Breadcrumb.vue';//面包屑
import userList from '../sys/User';
import userAdd from '../sys/User_add';
import menuList from '../sys/Menu';//菜单维护列表页面
import roleList from '../sys/Role';
import deptList from '../sys/Dept';

export default {
  name: 'main-center',

  components:{
    menuTree,
    breadcrumbNav,
    userList,
    userAdd,
    menuList,
    roleList,
    deptList,
  },

  computed: {
    ...mapState({
      menuItemList: state=>state.menu.navTree
    }),

  },
    
	data() {
	  return {
        menuItemList666666:[          
            {
             id:"1",name:'系统管理',method:'',
                children:[
                   {
                    id:"1-1",name:'用户管理',method:'addUser',
                       children:[
                           {
                            id:"1-1-1",name:'用户列表',method:'userList'
                           },
                           {
                            id:"1-1-2",name:'用户新增',method:'userAdd'
                           }
                        ]
                   },
                   {
                    id:"1-2",name:'机构管理',method:'addUser',
                   },
                ]
            },
            {id:"2",name:'菜单项2',method:''},
            {id:"3",name:'菜单项3',method:''},    
        ],
        currMenu:[],
        currentTabComponent:"",
        tableData:[],
        activeIndex: this.$route.name,
        breads:[],
	  };
	},

	methods: {

        openMenu(index){
           // this.currMenu.push(index).push;
        },
        userManage(){
            this.currentTabComponent= 'userList';  
        },
        addUser(){
            this.currentTabComponent= 'userAdd'; 
        },
        changeCurrentTabComponent(paramsFromSubComponent){
            //console.log("父");
            this.currentTabComponent= paramsFromSubComponent; 
        },
        handleMenuSelect(index,indexPath){
            this.breads=indexPath;

        }

	}
}
</script>
<style scoped>

</style>