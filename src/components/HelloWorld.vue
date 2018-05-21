<template>
  <div class="hello">
      <div v-on:click="add">hello</div>
      {{totle}}{{r}}
      <el-div class="one"
              :aa.sync="totle"
              v-on:click1="add1"
      >好 <h>a</h>
        <li slot-scope="item">
          <span>{{item.text}}</span>
        </li>
      </el-div>
    <router-view></router-view>
  </div>
</template>

<script>
  import a from '../App.vue'

export default {
  name: 'HelloWorld',
  components:{ elDiv:() => ({
      // 需要加载的组件。应当是一个 Promise
      component: import('./elDiv'),
      // 加载中应当渲染的组件
      loading: a,
      // 出错时渲染的组件
      error: a,
      // 渲染加载中组件前的等待时间。默认：200ms。
      delay: 2000,
      // 最长等待时间。超出此时间则渲染错误组件。默认：Infinity
      timeout: 3000
    }) },
  data () {
    return {
      totle:1,
      r:""
    }
  },
  created(){
    console.log(this.$route.params.id);
  },
  methods:{
    add(r){
      this.$router.push({name:"helloChildren",query:{yb1:"yangbos1",yb2:"yangbo2"}})
      this.r=r.msg
      this.totle++
    },
    add1(r){
      this.$router.push({name:"helloChildren1", query: { plan: this.totle}})
      this.r=r.msg
      this.totle++
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
