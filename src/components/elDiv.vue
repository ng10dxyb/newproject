<template>
  <div class="two">
    <div>ok</div>
    <slot :text="sa">只有在没有内容是显示</slot>
    <input type="text" :value="aa"><span v-on:click="add1">我是子组件{{p1}}</span>
  </div>
</template>
<script>
  import {mapState} from 'Vuex'
  export default ({
    name: "elDiv",
    props: {
      aa: null
    },
    data() {
      return {
        sa: "我阿妈",
        p1: this.aa
      }
    },
    created(){
      console.log(this.count)
    },
    methods: mapState({
      count: state => state.count,
      add1() {
        this.$emit("click1", {msg: "lalala"})
        this.p1 = this.aa
      }
    })

  })
</script>
