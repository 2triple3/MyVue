<template>
  <div>
    <el-container style="height: 600px; border: 1px solid #eee">
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
<style scoped>

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

</style>
