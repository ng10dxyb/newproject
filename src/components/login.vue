<template>
  <div class="container">
    {{ mes }}
    <div class=login>
      <ul>
        <li>
          <div class="tit">手机号</div>
          <div class="inp">
            <input type="text" v-model="phone">
          </div>
        </li>
        <li>
          <div class="tit">密码</div>
          <div class="inp">
            <input type="text" v-model="password" @keyup.enter="login">
          </div>
        </li>
      </ul>
    </div>
    <div class='btn'>
      <button class="fl" @click="login">登录</button>
      <button class="fr">注册</button>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        mes:"欢迎进入个人首页",
        password:"",
        phone:''
      }
    },
    created(){
      document.onkeydown = (event) => {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) {
          this.login();
        }
      }

    },
    methods:{
      login(){
        if(this.password=="nishizhu"&&this.phone=="13607059421"){
          sessionStorage.userId=true;
          sessionStorage.userName="yangbo"
          this.$router.push({name:"Home"})
          this.$store.commit('setUser',sessionStorage.userName)
        }
        else {
          alert("登录失败")
        }
      }
    }

  }
</script>
<style scoped>
  .container{
    margin: 0 auto;
    text-align: center;
    margin-top: 200px;
    width: 450px;
    height: 300px;
    background: #f0f3f4;
    padding-top: 50px;
  }
  .login{
    margin-top: 20px;
  }
  ul li div{
    display: inline-block;
    margin-top: 10px;
  }
  .tit{
    padding-right: 30px;
    width: 80px;
    text-align: right;
    line-height: 30px;
  }
  .inp{
    width: 200px;
    height: 30px;
  }
  .inp input{
    width: 100%;
    height: 100%;
  }
  .btn{
    width: 200px;
    height: 30px;
    margin: 0 auto;
    margin-top: 60px;
  }
  button{
    width: 60px;
    height: 30px;
    line-height: 30px;
  }
</style>
