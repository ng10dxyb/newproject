<template>
  <div class="container">
    <app-header class="header"></app-header>
    <app-side class="side"></app-side>
    <app-main class="main"></app-main>
    <app-footer class="footer"></app-footer>
  </div>
</template>
<script>
  import AppHeader from './layout/Appheader.vue'
  import AppSide from './layout/Appside.vue'
  import AppFooter from './layout/Appfooter.vue'
  import AppMain from './layout/AppMain.vue'
  export default {
    name: 'layout',
    components: { AppHeader, AppSide, AppFooter, AppMain},
    data(){
      return{
        mes:"主页"
      }
    }
  }
</script>
<style scoped>
  .container{
    width: 100%;
    height: 100%;
  }
  .header{
    width: 100%;
    height: 80px;
    border-bottom: 1px solid gray;
    /*background: pink;*/
  }
  .side{
    position: absolute;
    top: 80px;
    bottom: 40px;
    left: 0px;
    width: 200px;
    height: auto;
   /* height: auto;*/
    text-align: center;
    /*overflow: hidden;*/
    /*background: #01AAED;*/
    overflow-y: auto;
    border-right: 1px solid green;
  }
  .main{
    position: absolute;
    top: 80px;
    bottom: 100px;
    left: 200px;
    right: 0;
    width: auto;
    height: auto;
   /* background: red;*/
    overflow-y: auto;
  }
  .footer{
    margin-left: 200px;
    width: 100%;
    height: 40px;
    /*background: #1b6d85;*/
    position: fixed;
    bottom: 0;
    border-top: 1px solid grey;
  }
</style>
