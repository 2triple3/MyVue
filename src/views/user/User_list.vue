<template>
  <div>
        <!--工具区：条件搜索等-->
        <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
          <el-form :inline="true" :model="filters" size="small">
            <el-form-item>
              <el-input v-model="filters.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item>
              <my-button icon="fa fa-search" label="搜索"  type="" @click="findUser"/>
            </el-form-item>
            <el-form-item>
              <my-button icon="fa fa-plus" :label="$t('action.add')"  type="primary" @click="addUser()"/>
            </el-form-item>
          </el-form>
        </div>

        <!--数据列表-->        
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="400" border style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="userid" label="用户id" width="180"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="" label="注册日期"></el-table-column>
        <el-table-column prop="operation" label="操作">
         <template slot-scope="scope">
            <my-button icon="fa fa-edit" :label="$t('action.edit')"  @click="editUser(scope.row)" />
            <my-button icon="fa fa-trash" type="danger" label="删除"  @click="deleteUser(scope.$index, tableData)" />
         </template>   
        </el-table-column>
        </el-table>
        <!-- 新增/修改弹出界面 -->
        <el-dialog :title="'修改'" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
              <el-form :model="formData" :rules="rules" ref="formData" @keyup.enter.native="submitForm()" 
                label-width="80px" :size="size" style="text-align:left;">
                <el-form-item label="名称" prop="username">
                  <el-input v-model="formData.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" >
                  <el-input v-model="formData.password" placeholder="密码"> @focus="" id="password"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button :size="size"  @click="dialogVisible = false">{{$t('action.cancel')}}</el-button>
                <el-button :size="size"  type="primary" @click="submitForm()">{{$t('action.comfirm')}}</el-button>
              </span>
        </el-dialog>
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
  </div>
</template>

<script>
import MyButton from "@/views/utils/MyButton"
//import FaIconTooltip from "@/components/FaIconTooltip"

export default {

  components:{
    MyButton,
    //FaIconTooltip,
  },

  data() {
	  return {
        size: 'small',
        filters: {
          username: ''
        },        
        tableData:[],
        formData: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度是6到10位的字母或数字', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur'},
            { min: 6, max: 10 ,message: '长度是6到10位的字母或数字', trigger: 'blur'}
          ]
        },
        dialogVisible: false,
        currentPage:1, //初始页
        pagesize:10,   //每页的数据

	  };
  },

  mounted(){
      this.findTableData();
  },

  methods:{
        // 获取列表数据
        findTableData: function () {
          this.loading = true
          this.axios.get(
            'http://127.0.0.1:8081/api/userlist',
            {headers: {'Content-Type': 'application/json;charset=UTF-8'}}
          ).then(
            (response) => {
                  this.tableData = response.data.userlist;
                  this.loading = false;                     
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

        editUser(row){
            this.dialogVisible = true;
            Object.assign(this.formData, row);
        },

        deleteUser(index, tabledata){
            this.$confirm('确认删除吗？', '提示', {}).then(() => {
                const username = tabledata[index].username;
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
            }).catch(()=>{});
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

        findUser(){

                let params = JSON.stringify(this.filters)
                this.axios.post(
                  'http://127.0.0.1:8081/user/findUser',
                  params,
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

        // 表单提交
        submitForm () {
              this.$refs['formData'].validate((valid) => {
              if (valid) {
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                  this.editLoading = true
                  let params = Object.assign({}, this.formData)

                  this.axios.post(
                    'http://127.0.0.1:8081/user/save',
                    params,
                    {headers: {'Content-Type': 'application/json;charset=UTF-8'}}
                  ).then(
                          (response) => {
                            this.editLoading = false
                            if(response.data.code == 200){
                                this.dialogVisible = false
                                this.$refs['formData'].resetFields()
                                this.$message({
                                  offset:90,
                                  message: '操作成功',
                                  type: 'success'
                                })
                            }else {
                                this.$message({
                                  offset:90,
                                  message: '操作失败',
                                })
                            }
                            this.findTableData();
                          }
                  ).catch((response)=>{
                          this.registerTips="注册提交时连接失败!";
                          //alert("与服务器连接失败!");
                          console.log(response)
                  });

                })
              }
            })
        },

  }

}
</script>
<style scoped>



</style>


