<template>
  <div>
    <el-container style="height: 650px; border: 1px solid #eee">
      <el-header><main-top/></el-header>
      <el-container>
        <el-main><main-center/></el-main>
      </el-container>
      <el-footer><main-bottom/></el-footer>
    </el-container>
  </div>
</template>

<script>
import mainTop from './Main_top';
import mainLeft from './Main_left';
import mainCenter from './Main_center';
import mainBottom from './Main_bottom';
export default {
  name: 'mymain', 
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



</style>
