<template>
  <div>
    <el-container>
      <el-header><main-top/></el-header>
      <el-container>
        <el-aside width="200px"><main-left/></el-aside>
        <el-main><main-center/></el-main>
      </el-container>
      <el-footer><main-bottom/></el-footer>
    </el-container>
  </div>
</template>

<script>
import mainTop from './main_top';
import mainLeft from './main_left';
import mainCenter from './main_center';
import mainBottom from './main_bottom';
export default {
  name: 'utanmain', 
  components:{
      mainTop,
      mainLeft,
      mainCenter,
      mainBottom,
  },
  data () {
    return {
      //msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-header, .el-footer {
    background-color: #545c64;
    color: #333;
    text-align: center;
   
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;


  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 360px;
    padding:0px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  

</style>
