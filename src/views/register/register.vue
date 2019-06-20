<template>
  <div class="wrapper center flex-col-box login-background">
    <p style="font-size:20px;color:#ff0000;">vuex测试：{{mydata}}</p>   
    
    <div class="login-title">XXX平台</div>
    <div class="login-box flex-col-box center">
      <div id="registerTips" style="color:red;float:left">{{registerTips}}</div>
      <el-form :model="formData" ref="registerForm" :rules="rules" label-position="left" label-width="80px" >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" @blur="checkUsernameExist()" @focus="removeRegisterTips()"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="confirm">
          <el-input v-model="formData.confirm"></el-input>
        </el-form-item>

        <div class="margin-top20">
          <el-form-item>
            <el-button class="dif-margin20" type="primary" @click="submitForm('registerForm')">注册</el-button>
            <el-button class="margin-left40" @click="resetForm('registerForm')">清空</el-button>
          </el-form-item>
        </div>

      </el-form>
      <div class="go-register">
        <router-link style="float: right" to="/login">已有账号?去登录</router-link>
      </div>
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
          return callback(new Error('用户名长度是3到10位的字母或数字'));
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
          return callback(new Error('密码长度是6到10位的字母或数字'));
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
      },
      handleChange(val) {
        console.log(val);
      },
      checkUsernameExist(){
            const username = this.formData.username;
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
            ).catch(function (response) {
                    //this.loginTips="与服务器连接失败!";
                    alert("与服务器连接失败!");
                    console.log(response)
            });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
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
                        message: '注册成功',
                        type: 'success'
                      });
                  }
              }
            ).catch(function (response) {
                    //console.log(response)
            });

          } else {
            alert('error submit!!');
            return false;
          }
        });
      }

    }
  }
</script>

<style  scoped>
  .login-box{
    width: 350px;
    height: 350px;
    padding-right: 20px;
    border: 1px solid #cccccc;
    background: #ffffff;
  }
  .login-background{
    background: #324157;
  }
  .login-title{
    width: 100%;
    height: 100px;
    line-height: 100px;
    font-size: 30px;
    color: #ffffff;
    text-align: center;
  }
  .go-register{
    width: 250px;
  }
  .dif-margin20{
    margin-left: -70px;
  }

</style>
