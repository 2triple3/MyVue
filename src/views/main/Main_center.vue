<template>
  <div>
      <el-container>
        <el-aside width="200px">
            <el-menu :default-openeds="currMenu" @open="openMenu" unique-opened @select="handleMenuSelect">
                <menuTree :menuList="menuList"></menuTree> 
            </el-menu>
        </el-aside>

        <el-main>
            <breadcrumbNav :currentPath="breads"></breadcrumbNav>
            <br/>
            <component v-bind:is="currentTabComponent" v-on:changeComponent="changeComponent"></component>
        </el-main>

      </el-container>
      
  </div>
</template>

<script>
import menuTree from './MenuTree.vue';//菜单树不含根节点el-menu因为树内有递归
import breadcrumbNav from './Breadcrumb.vue';//面包屑
import userList from '../user/User_list';
import userAdd from '../user/User_add';

export default {
    name: 'main-center',

    components:{
      menuTree,
      breadcrumbNav,
      userList,
      userAdd,
    },
    
	data() {
	  return {
        menuList:[          
            {
             resourceId:"1",resourceName:'用户管理',resourceMethod:'',
                children:[
                   {
                    resourceId:"1-1",resourceName:'用户维护',resourceMethod:'addUser',
                       children:[
                           {
                            resourceId:"1-1-1",resourceName:'用户列表',resourceMethod:'userList'
                           },
                           {
                            resourceId:"1-1-2",resourceName:'用户新增',resourceMethod:'userAdd'
                           }
                        ]
                   },
                ]
            },
            {resourceId:"2",resourceName:'菜单项2',resourceMethod:''},
            {resourceId:"3",resourceName:'菜单项3',resourceMethod:''},    
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
        changeComponent(paramsFromSubComponent){
            this.currentTabComponent= paramsFromSubComponent; 
        },
        handleMenuSelect(index,indexPath){
            this.breads=indexPath;
            const taskName = indexPath[indexPath.length - 1];
            let componentName = "";
            if(taskName==="用户列表")componentName="userList";
            if(taskName==="用户新增")componentName="userAdd";
            this.currentTabComponent= componentName; 
        }

	}
}
</script>
<style scoped>

</style>