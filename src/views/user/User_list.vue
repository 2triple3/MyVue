<template>
  <div>
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="400" border style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="userid" label="用户id" width="180"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="" label="注册日期"></el-table-column>
        <el-table-column prop="operation" label="操作">
         <template slot-scope="scope">
            <el-button type="danger" @click="deleteUser(scope.$index, tableData)" size="small">
            删除
            </el-button>
         </template>   
        </el-table-column>
        </el-table>
        <br/>
        <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20, 40]" 
              :page-size="pagesize"         
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.length">   
            </el-pagination>
        </div>
        <el-button type="primary" @click="addUser()" style="display:none">新增用户</el-button>
  </div>
</template>

<script>
export default {

  data() {
	  return {
        currentPage:1, //初始页
        pagesize:10,   //每页的数据
        tableData:[],
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

  methods:{
  	    deleteUser(index, rows){
            const username = rows[index].username;
            this.axios.get(
              'http://127.0.0.1:8081/api/deleteUser/'+username,
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
        addUser(){
            this.$emit("changeComponent",'userAdd');
            //this.currentTabComponent= 'userAdd'; 
        },
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange(size) {
                this.pagesize = size;
                //console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange(currentPage){
                this.currentPage = currentPage;
                //console.log(this.currentPage)  //点击第几页
        },
  }

}
</script>
<style scoped>



</style>


