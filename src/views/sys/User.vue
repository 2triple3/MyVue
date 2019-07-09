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
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="330" border style="width: 100%">

            <el-table-column header-align="center" align="center" 
            v-for="column in columns"
            :prop="column.prop" 
            :label="column.label" 
            :width="column.width" 
            :min-width="column.minWidth" 
            :fixed="column.fixed" 
            :key="column.prop" 
            :type="column.type" 
            :formatter="column.formatter" :sortable="column.sortable==null?true:column.sortable">
            </el-table-column>

            <el-table-column prop="operation" label="操作" width="185" fixed="right" header-align="center" align="center">
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
import { format } from "@/utils/datetime"
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
        columns: [],
        filterColumns: [],      
        tableData:[],
        formData: {
          userid:'',
          username:'',
          password:'',
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
      this.findTableData()
      this.initColumns()
  },

  methods:{

        //初始化表格列
          initColumns: function () {
              this.columns = [
                {prop:"userid", label:"ID", minWidth:50},
                {prop:"username", label:"用户名", minWidth:120},
                {prop:"password", label:"密码", minWidth:120},
                {prop:"deptId", label:"机构号", minWidth:120},
                {prop:"roleNames", label:"角色", minWidth:100},
                {prop:"createTime", label:"创建时间", minWidth:120, formatter:this.dateFormat}
              ]
              this.filterColumns = JSON.parse(JSON.stringify(this.columns));
          },

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

        // 时间格式化
        dateFormat: function (row, column, cellValue, index){
            return format(row[column.property])
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

                  this.$api.user.update(params).then((res) => {
                    this.editLoading = false
                    if(res.code == 200) {
                      this.$message({ message: '操作成功', type: 'success' })
                      this.dialogVisible = false
                      this.$refs['formData'].resetFields()
                    } else {
                      this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                    }
                   this.findTableData()
                  })


/*                  this.axios.post(
                    'http://127.0.0.1:8081/user/update',
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
                          this.registerTips="提交时连接失败!";
                          //alert("与服务器连接失败!");
                          console.log(response)
                  });
  */                

                })
              }
            })
        },

  }

}
</script>
<style scoped>



</style>


