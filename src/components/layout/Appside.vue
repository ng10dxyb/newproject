<template>
  <div class=container>
      <ul>
        <li v-for="value in sideStates" :key="Math.random()" @click="open(value.path)">{{value.title}}</li>
      </ul>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'sideNav',
    data() {
      return {
        aaa:33
      }
    },
    created(){
      console.log(this.sideStates);
      console.log(this.$router);
      console.log(this.$router.currentRoute);
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        if (to.path=="/vue/home2/children1"){
          this.$router.push({name:"yb2",params: { id: 123 }})
        }
        if (to.path=="/vue/home2/children2"){
          this.$router.push({name:"yb3",params: { id: 'yb3' }})
        }
      }
      },
    computed: {
      ...mapGetters([
        'sideStates'
      ])
    },
    methods: {
      open(val){
        console.log(val);
        this.$router.push(val)
      }
    }
  }
</script>
<style scoped>
  ul li{
    border: 1px solid black;
    width: 100%;
    height: 30px;
    background: #2e8ded;
    line-height: 30px;
    color: white;
    cursor: pointer;
  }
</style>
