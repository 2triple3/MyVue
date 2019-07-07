<template>
  <div class="wrapper center flex-col-box login-background"> 

    <div>
      <button v-on:click="clickEvent">add</button>
      <button v-on:click="clickdecEvent">dec</button>
    </div>
    <div>
      <p style="font-size:20px;color:#ff0000;">vuex测试：{{myNum}}</p>   
    </div>
      
    <div class="login-title">XXX平台</div>
    <el-tabs type="border-card" v-model="activeName" stretch>
      <el-tab-pane label="普通登录" name="first">
          <div class="login-box flex-col-box center">
              <div id="loginTips" style="color:red;float:left">{{loginTips}}</div>
              <el-form :model="formData" ref="myForm" :rules="rules" label-position="left" label-width="80px" >
                <el-form-item label="用户名" prop="username" >
                  <el-input  v-model="formData.username" @focus="removeLoginTips()" id="username"></el-input>
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
      </el-tab-pane>
      <el-tab-pane label="QQ/微信登录" name="second">
          <div class="login-box flex-col-box center">
              <el-form :model="formData_qqwx" ref="myForm_qqwx" label-position="left" label-width="80px" >
                <el-form-item label="QQ/微信" prop="username" >
                  <el-input v-model="formData_qqwx.username" @focus="removeLoginTips()" id="qqwxusername"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" >
                  <el-input v-model="formData_qqwx.password" @focus="removeLoginTips()" id="qqwxpassword"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button class="login-btn" type="primary" @click="submitForm('myForm_qqwx')">登录</el-button>
                </el-form-item>
              </el-form>
              <div class="go-register"> 
                  <span><router-link  to="/register" style="float:right">快速注册</router-link></span>
              </div>
         </div>
      </el-tab-pane>

    </el-tabs>


  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        activeName: 'first',//初始标签页
        loginTips:'',
        apiUrl: 'http://127.0.0.1:8000/api/login',
        formData: {
          username: '',
          password: ''
        },
        formData_qqwx:{
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度是3到10位的字母或数字', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur'},
            { min: 3, max: 10 ,message: '长度是3到10位的字母或数字', trigger: 'blur'}
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
      handleClick(tab, event) {
        console.log(tab, event);
      },
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
        window.sessionStorage.setItem('userInfo',obj);
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
                            offset:90,
                            message: '登录成功',
                            type: 'success'
                          });
                          this.$router.replace('/');   
                      }else{
                          this.loginTips="用户名或密码错误!";
                          $("#password").val("");
                      }                         
              }
            ).catch((response)=>{
                    this.loginTips="登录提交时连接失败!";
                    //alert("与服务器连接失败!");
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
    //border: 1px solid #cccccc;
    background: #ffffff;
  }
  .login-background{
    //background: #324157;
  }
  .login-title{
    width: 100%;
    height: 40px;
    line-height: 30px;
    font-size: 30px;
    //color: #ffffff;
    text-align: center;
  }
  .go-register{
    width: 250px;
  }
  .login-btn{
    width: 100%;
  }

</style>
