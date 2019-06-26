<template>

  <div >

	            <el-menu :default-openeds="currMenu" @open="openMenu">
              <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-message"></i>用户维护
                </template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="1-1" @click="getUserlist()">用户管理</el-menu-item>
                  <el-menu-item index="1-2" @click="">用户新增</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                </el-submenu>
              </el-submenu>

              <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>导航二</template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="2-1">选项1</el-menu-item>
                  <el-menu-item index="2-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="2-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="2-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="2-4-1">选项4-1</el-menu-item>
                </el-submenu>
              </el-submenu>

              <el-submenu index="3">
                    <template slot="title"><i class="el-icon-setting"></i>导航三</template>
                    <el-menu-item-group>
                      <template slot="title">分组一</template>
                      <el-menu-item index="3-1">选项1</el-menu-item>
                      <el-menu-item index="3-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                      <el-menu-item index="3-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="3-4">
                      <template slot="title">选项4</template>
                      <el-menu-item index="3-4-1">选项4-1</el-menu-item>
                    </el-submenu>
              </el-submenu>
            </el-menu>

  </div>
</template>


<script>

export default {

  name: 'main-left',

  created:function(){
      //alert(window.location.href);
   	  //let ckeditor = document.createElement('script');    
      //ckeditor.setAttribute('type',"text/javascript");
      //ckeditor.setAttribute('src',"../../static/dtreet.js");
	  //document.head.appendChild(ckeditor);
  },

  data(){
		return{
      currMenu:[],
		}
  },

  mounted(){
	  $(function () {  
	    console.log("测试jquery引入成功");
	  }); 
  },

  components: {

  },

  methods:{
        openMenu(index){
            this.currMenu.push(index).push;
        },

		}

}
</script>
<style scoped>


</style>