<template>
  <div>
      <el-table :data="tableData" height="450" border style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="userid" label="用户id" width="180"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="operation" label="操作">操作</el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
    name: 'main-center',

	data() {
	  return {
        tableData:[]
	  };
	},

    mounted(){
            this.axios.get(
              'http://127.0.0.1:8081/api/userlist',
              {headers: {'Content-Type': 'application/json;charset=UTF-8'}}
            ).then(
              (response) => {
                      this.tableData = response.data.userlist;                     
              }
            ).catch((response)=>{
                    this.registerTips="检查用户名是否存在时连接失败!";
                    //alert("与服务器连接失败!");
                    console.log(response)
            });
    },

	methods: {

	}
}
</script>
<style scoped>



</style>