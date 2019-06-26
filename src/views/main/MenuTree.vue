<template>
    <div>

      <template v-for="list in menuList" >
        <el-submenu v-if="list.children && list.children.length>0" :key="list.resourceId" :index="list.resourceName"  >
          <template slot="title"  style="padding-left:10px" >
            <i class=""></i>
            <span slot="title">{{list.resourceName}}</span>
          </template>
          <MenuTree :menuList="list.children"></MenuTree>
        </el-submenu>
        <el-menu-item v-else :index="list.resourceName"  :key="list.resourceId" style="" @click="changeParentComponent(list.resourceMethod)" >
          <span>{{list.resourceName}}</span>
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

  props:['menuList'],

  methods: {
    handleRoute (menu) {
      // 通过菜单URL跳转至指定路由
      //this.$router.push(menu.url)
    },
    changeParentComponent(name){
      //alert(list.resourceMethod);
      //alert(name);
      this.$emit("changeComponent",name);
    },

  }

}

</script>