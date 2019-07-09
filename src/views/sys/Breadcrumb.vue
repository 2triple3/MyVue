<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="list in currentPath" v-bind:key="list">{{list}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<style>


</style>
<script>
    export default{
        data(){
            return {}
        },
       props:['currentPath']
    }
</script>



