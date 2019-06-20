<template>
  <div class="wrapper center flex-col-box login-background">  
    <button v-on:click="clickEvent">add</button>
    <button v-on:click="clickdecEvent">dec</button>
    <p style="font-size:20px;color:#ff0000;">vuex测试：{{myNum}}</p>     

    <div class="login-title">XXX平台</div>
    <div class="login-box flex-col-box center">
      <div id="loginTips" style="color:red;float:left;width=80px">{{loginTips}}</div>
      <el-form :model="formData" ref="myForm" :rules="rules" label-position="left" label-width="80px" >
        <el-form-item label="用户名" prop="username" >
          <el-input v-model="formData.username" @focus="removeLoginTips()" id="username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password" >
          <el-input v-model="formData.password" @focus="removeLoginTips()" id="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm('myForm')">登录</el-button>
        </el-form-item>

      </el-form>
      <div class="go-register">
        <span><router-link  to="/forgetPassword" style="float:right">忘记密码</router-link></span>
        <span style="float:right">&nbsp;&nbsp;</span> 
        <span><router-link  to="/register" style="float:right">快速注册</router-link></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        loginTips:'',
        apiUrl: 'http://127.0.0.1:8000/api/login',
        formData: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur'},
            { min: 6, max: 10 ,message: '长度在 6 到 10 个字符', trigger: 'blur'}
          ]
        },
      }
    },
    computed: {
        myNum(){
            return this.$store.state.num
        }
    },
    methods: {
      resetForm(formName){
        this.$refs[formName].resetFields();
      },
      removeLoginTips(){
        this.loginTips='';
      },
      clickEvent(){
        this.$store.commit('add');
      },
      clickdecEvent(){
        this.$store.commit('dec');
      },
      handleChange(val) {
        console.log(val);
      },
      setUserInfo(obj){
        window.localStorage.setItem('userInfo',obj);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var obj = JSON.stringify(this.formData);
            this.axios.get(
              'http://127.0.0.1:8081/api/login',
              {
                params: {
                            username: this.formData.username,
                            password: this.formData.password,
                        }
              },
              {headers: {'Content-Type': 'application/json;charset=UTF-8'}}
            ).then(
              (response) => {
                      if(response.data.status=="1"){
                          this.setUserInfo(obj);
                          this.$message({
                            message: '登录成功',
                            type: 'success'
                          });
                          this.$router.replace('/');   
                      }else{
                          this.loginTips="用户名或密码错误!";
                          $("#password").val("");
                      }                         
              }
            ).catch(function (response) {
                    //this.loginTips="与服务器连接失败!";
                    alert("与服务器连接失败!");
                    console.log(response)
            });

          } else {
            //this.loginTips='格式有误!';
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
    height: 290px;
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
  .login-btn{
    width: 100%;
  }

</style>
