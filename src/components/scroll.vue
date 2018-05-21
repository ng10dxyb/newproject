<template>
  <div class="container">
  <h1>滚动效果</h1>
  <ul class="ul">
    <li><router-link to="/">首页</router-link></li>
    <!--<li><router-link to="home2/children3/nav">导航</router-link></li>-->
    <li><router-link to="/vue/home2/children3/about">关于</router-link></li>
    <li><router-link to="/vue/home2/children3/home">home</router-link></li>
    <li><router-link to="/vue/home2/children3/foo">foo</router-link></li>
    <li><router-link to="/vue/home2/children3/about#red">红</router-link></li>
    <li><router-link to="/vue/home2/children3/about#blue">蓝</router-link></li>
  </ul>
  <br/>
  <router-view class="ss"></router-view>
</div>
</template>
<script>

</script>
<style scoped>
  .ss{
    height: 200px;
    overflow-y: auto;
  }
</style>
