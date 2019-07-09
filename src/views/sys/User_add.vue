<template>
  <div>
    <div class="flex-col-box center">

      <p id="registerTips" style="color:red;text-align: left">{{registerTips}}</p>
      <el-form :model="formData" ref="registerForm" :rules="rules" label-position="left" label-width="80px" >
          <el-form-item label="用户名" prop="username" style="width:380px">
            <el-input v-model="formData.username" @blur="checkUsernameExist()" @focus="removeRegisterTips()" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="width:380px">
            <el-input v-model="formData.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirm" style="width:380px">
            <el-input v-model="formData.confirm"></el-input>
          </el-form-item>
          <div class="margin-top20">
            <el-form-item style="width:380px">
              <el-button  type="primary" style="float:right" @click="submitForm('registerForm')">提交</el-button>
              <el-button class="margin-right20" style="float:right" @click="resetForm('registerForm')">重置</el-button>
            </el-form-item>
          </div>
        </el-form>

    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      //username验证
      const checkUsername = function (rule, value, callback) {
        var reg = /^\w{3,10}$/;
        if(!value){
          return callback(new Error('用户名不为空'));
        } else if(!reg.test(value)) {
          return callback(new Error('长度是3到10位的字母或数字'));
        } else {
          callback();
        }
      };
      //password验证函数
      const checkPassword = function (rule, value, callback) {
        var reg = /^\w{6,10}$/
        if(!value){
          return callback(new Error('密码不为空'));
        }else if(!reg.test(value)) {
          return callback(new Error('长度是6到10位的字母或数字'));
        }else {
          callback();
        }
      };
      //确认密码验证函数
      const checkConfirm = function (rule, value, callback) {
        if(!value){
          return callback(new Error('密码不为空'));
        }else if(this.formData.password !== value){
          return callback(new Error('请确保两次密码输入一致'));
        }else {
          callback();
        }
      };

      return {
        registerTips:'',
        formData: {
          username: '',
          password: '',
          confirm: ''
        },
        rules: {
          username: [
            { validator: checkUsername, trigger: 'blur' }
          ],
          password: [
            { validator: checkPassword, trigger: 'blur' }
          ],
          confirm: [
            { validator: checkConfirm.bind(this), trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
        mydata: function () {
          return this.$store.state.num;
        }
    },
    methods: {
      removeRegisterTips(){
        this.registerTips="";
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
        this.removeRegisterTips();
      },
      handleChange(val) {
        console.log(val);
      },
      checkUsernameExist(){
            const username = this.formData.username;
            if(!username){
               return;
            }
            this.axios.get(
              'http://127.0.0.1:8081/api/checkUsernameExist/' + username,
              {headers: {'Content-Type': 'application/json;charset=UTF-8'}}
            ).then(
              (response) => {
                      if(response.data.status=="1"){
                          this.registerTips="用户名已存在!";
                      }else{
                          this.registerTips="";
                      }                       
              }
            ).catch((response)=>{
                    this.registerTips="检查用户名是否存在时连接失败!";
                    //alert("与服务器连接失败!");
                    console.log(response)
            });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(this.registerTips){        
            return;
          }
          if (valid) {
            var obj = JSON.stringify(this.formData);
            this.axios.post(
              'http://127.0.0.1:8081/api/register',
              obj,
              {headers: {'Content-Type': 'application/json;charset=UTF-8'}}
            ).then(
              (response) => {
                  if(response.data.status=="1"){
                      this.$message({
                        offset:90,
                        message: '用户添加成功',
                        type: 'success'
                      });
                      this.resetForm('registerForm');
                  }else{
                      this.registerTips="用户名已存在!";
                  }
              }
            ).catch((response)=>{
                    this.registerTips="注册提交时连接失败!";
                    //alert("与服务器连接失败!");
                    console.log(response)
            });

          } else {
            //alert('格式有误!');
            return false;
          }
        });
      }

    }
  }
</script>

<style  scoped>

</style>
