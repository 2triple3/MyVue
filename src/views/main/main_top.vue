<template>
	<div>
		<el-menu :default-active="activeIndex2"  class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
		
				  <el-menu-item index="1" @click="homePage">首页</el-menu-item>   
				  <el-submenu index="2">
				    <template slot="title">我的工作台</template>
				    <el-menu-item index="2-1">选项1</el-menu-item>
				    <el-menu-item index="2-2">选项2</el-menu-item>
				    <el-menu-item index="2-3">选项3</el-menu-item>
				    <el-submenu index="2-4">
				      <template slot="title">选项4</template>
				      <el-menu-item index="2-4-1">选项1</el-menu-item>
				      <el-menu-item index="2-4-2">选项2</el-menu-item>
				      <el-menu-item index="2-4-3">选项3</el-menu-item>
				    </el-submenu>
				  </el-submenu>
				  <el-menu-item index="3" disabled>消息中心</el-menu-item>
				  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
				
				  <el-menu-item index="5">
				  	 <div id="username">
					  	 <p>
					  	 欢迎 : {{currUsername}}
					  	 </p>
				  	 </div>	
				  </el-menu-item>
                
				  <el-menu-item index="6">
				  	<a href="#" ><span>设置</span></a> |
					<a href="#" @click="dialogVisible = true"><span>退出</span></a>
					<!--elementUI弹出框bengin-->
					<el-dialog
					  title="提示"
					  :visible.sync="dialogVisible"
					  width="30%"
					  :before-close="handleClose">
					  <span>确认退出么?</span>
					  <span slot="footer" class="dialog-footer">
					    <el-button type="primary" @click="logOut">确 定</el-button>
					    <el-button @click="dialogVisible = false">取 消</el-button>
					  </span>
					</el-dialog>
				    <!--elemetUI弹出框end-->
				  </el-menu-item>

	    </el-menu>
    </div>
</template>

<script>
export default {
  	name: 'main-top',

  	data() {
  	  const currUsername = JSON.parse(window.localStorage.getItem('userInfo')).username;
	  return {
	    currUsername:currUsername,
	    dialogVisible: false,
	    activeIndex: '1',
	    activeIndex2: '1'
	  };
	},

	methods: {
      homePage(){
        this.$router.go(0);
        //this.$router.replace('/');
      },

	  //关闭弹出框前的调用
      handleClose(done) {
       done();
      },

	  handleSelect(key, keyPath) {
	    //console.log(key, keyPath);
	  },
      logOut(){
        localStorage.clear();
        this.dialogVisible=false;
      	this.$router.replace('/login');
      }
	}
}
</script>
<style scoped>



#nav,#username,#menu{
	
}

#menu ul li {
	float: left;
	display: inline;
	margin-left: 14px;
}

a {
	color: #000;
	list-style: none;
	text-decoration: none;
}
a:visited {
	color: #000;
}
a:hover {
	color: #FF8000;
}
</style>