<template>
	<div class="headbar" :style="{'background':themeColor}" :class="$store.state.app.collapse?'position-collapse-left':'position-left'">
		<!-- LOGO -->
	    <span class="logo" >
		    <el-menu class="el-menu-demo" :background-color="themeColor" text-color="#fff" :active-text-color="themeColor" mode="horizontal">
		        <el-menu-item index="1" @click=""><img src="@/assets/images/logo.png"/></el-menu-item>
		     </el-menu>
	    </span>
	    
	    
		<!-- 导航收缩 -->
	    <span class="hamburg">
	      <el-menu class="el-menu-demo" :background-color="themeColor" text-color="#fff" :active-text-color="themeColor" mode="horizontal">
	        <el-menu-item index="1" @click="onCollapse"><hamburger :isActive="collapse"></hamburger></el-menu-item>
	      </el-menu>
	    </span>
		<!-- 导航菜单 -->
	    <span class="headnavbar">
	      <el-menu :default-active="activeIndex" class="el-menu-demo" 
	          :background-color="themeColor" text-color="#fff" active-text-color="#ffd04b" mode="horizontal" @select="selectNavBar()">
	        <el-menu-item index="1" @click="$router.push('/')">
	        <i class="fa fa-home fa-lg"></i>  
	        </el-menu-item>
	        <el-menu-item index="2" @click="openWindow('https://baidu.com')">百度</el-menu-item>
	        <el-menu-item index="3" @click="openWindow('https://douyu.com')">斗鱼</el-menu-item>
		    <el-menu-item index="4" @click="openWindow('https://bilibili.com')">bilibili</el-menu-item>
		    </el-menu>
	    </span>
	    <!-- 工具栏 -->
	    <span class="toolbar">
	      <el-menu class="el-menu-demo" :background-color="themeColor" :text-color="themeColor" :active-text-color="themeColor" mode="horizontal">
	        <el-menu-item index="1">
	          <!-- 主题切换 
	          <theme-picker class="theme-picker" :default="themeColor" @onThemeChange="onThemeChange"></theme-picker>
	          -->
	        </el-menu-item>
	        <el-menu-item index="2" v-popover:popover-lang>
	          <!-- 语言切换 -->
	          <li style="color:#fff;" class="fa fa-language fa-lg"></li>
	          <el-popover ref="popover-lang" placement="bottom-start" trigger="click" v-model="langVisible">
	            <div class="lang-item" @click="changeLanguage('zh_cn')">简体中文</div>
	            <div class="lang-item" @click="changeLanguage('en_us')">English</div>
	          </el-popover>
	        </el-menu-item>
	        <el-menu-item index="3" v-popover:popover-message>
	          <!-- 我的私信 -->
	          <el-badge :value="5" :max="99" class="badge" type="success">
	            <li style="color:#fff;" class="fa fa-envelope-o fa-lg"></li>
	          </el-badge>
	          <el-popover ref="popover-message" placement="bottom-end" trigger="click">
	            <message-panel></message-panel>
	          </el-popover>
	        </el-menu-item>
	        <el-menu-item index="4" v-popover:popover-notice>
	          <!-- 系统通知 -->
	          <el-badge :value="4" :max="99" class="badge" type="success">
	            <li style="color:#fff;" class="fa fa-bell-o fa-lg"></li>
	          </el-badge>
	          <el-popover ref="popover-notice" placement="bottom-end" trigger="click">
	            <notice-panel></notice-panel>
	          </el-popover>
	        </el-menu-item>
	        <el-menu-item index="5" v-popover:popover-personal>
	          <!-- 用户信息 -->
	          <span class="user-info"><img :src="user.avatar" />欢迎：{{user.name}}</span>
	          <el-popover ref="popover-personal" placement="bottom-end" trigger="click" :visible-arrow="false">
	            <personal-panel :user="user"></personal-panel>
	          </el-popover>
	        </el-menu-item>
	      </el-menu>
	    </span>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Hamburger from "@/components/Hamburger"
import ThemePicker from "@/components/ThemePicker"
import NoticePanel from "@/views/Core/NoticePanel"
import MessagePanel from "@/views/Core/MessagePanel"
import PersonalPanel from "@/views/Core/PersonalPanel"

export default {
  	name: 'main-top',

  	components:{
  	    Hamburger,
        ThemePicker,
        NoticePanel,
        MessagePanel,
        PersonalPanel,

  	},

  	data() {
	  return {
	    user: {
	        name: "wakaka",
	        avatar: "",
	        role: "超级管理员",
	        registeInfo: "注册时间：2018-12-20 "
	    },
	    dialogVisible: false,
	    activeIndex: '1',
	    //themeColor:'#545c64',
	    langVisible: false,

	  };
	},

	computed:{
	    ...mapState({
	      appName: state=>state.app.appName,
	      themeColor: state=>state.app.themeColor,
	      collapse: state=>state.app.collapse
	    })
  	},

	mounted(){
	  const currUsername = JSON.parse(window.localStorage.getItem('userInfo')).username
  	  this.user.name = currUsername
      this.user.avatar = require("@/assets/images/user.png")
	},

	methods: {
	   // 折叠导航栏
	  onCollapse: function() {
	    //this.$store.commit('onCollapse')
	  },
	  openWindow(url) {
        window.open(url)
      },
	  selectNavBar(key, keyPath) {
	    console.log(key, keyPath)
	  },
	  // 切换主题
	  onThemeChange: function(themeColor) {
	     // this.$store.commit('setThemeColor', themeColor)
	  },
	  // 语言切换
	  changeLanguage(lang) {
	      lang === '' ? 'zh_cn' : lang
	      this.$i18n.locale = lang
	      this.langVisible = false
	  },

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
<style scoped lang="scss">

.headbar {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1030;
  height: 60px;
  line-height: 60px;
  border-color: rgba(180, 190, 190, 0.8);
  border-left-width: 1px;
  border-left-style: solid;
}
.hamburg, .headnavbar {
  float: left;
}
.toolbar {
  float: right;
}
.lang-item {
  font-size: 16px;
  padding-left: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
}
.lang-item:hover {
  font-size: 18px;
  background: #b0d6ce4d;
}
.user-info {
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    margin: 10px 0px 10px 10px;
    float: right;
  }
}
.badge {
  line-height: 18px;
}
.position-left {
  left: 0px;
}
.position-collapse-left {
  left: 65px;
}

.logo {
  float: left;
  img {
    width: 40px;
    height: 40px;
    border-radius: 0px;
    margin: 10px 10px 10px 10px;
    float: left;
  }
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