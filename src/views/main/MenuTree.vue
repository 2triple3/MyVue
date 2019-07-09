<template>
    <div ref="menutree">

      <template v-for="menuItem in menuItemList" >
        <el-submenu v-if="menuItem.children && menuItem.children.length>0" :key="menuItem.resourceId" :index="menuItem.name"  >
          <template slot="title"  style="padding-left:10px" >
            <i class=""></i>
            <span slot="title">{{menuItem.name}}</span>
          </template>
          <MenuTree :menuItemList="menuItem.children" v-on:changeComponent="changeParentComponent"></MenuTree>
        </el-submenu>
        <el-menu-item v-else :index="menuItem.name"  :key="menuItem.id" style="" @click="changeParentComponent(menuItem.method)" >
          <span>{{menuItem.name}}</span>
        </el-menu-item>
      </template>

    </div>
</template>

<script>

export default {
  name: 'MenuTree',

  data(){
      return {}
  },

  props:['menuItemList'],

  methods: {
    handleRoute (menuItem) {
      //通过菜单URL跳转至指定路由
      this.$router.push(menuItem.url)
    },
    changeParentComponent(method){
      //通过emit调用父组件中的方法控制组件的显示从而响应菜单项点击
      //console.log("子");
      this.$emit("changeComponent",method);
    },
  }

}

</script>