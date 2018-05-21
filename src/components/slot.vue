<template>
  <div>
    大家好，我是slot组件

    <app-slot :items="items">
      <template slot="item" scope="res">
        <li @click="btn(res)">
          {{res.t}}
        </li>
      </template>
    </app-slot>
    <router-view></router-view>
  </div>
</template>


<script>
  import AppSlot from "./appSlot"

  export default ({
    data() {
      return {
        items: [
          {text: '实例1'},
          {text: '实例2'},
          {text: '实例3'},
          {text: '实例4'},
          {text: '实例5'},
          {text: '实例6'}
        ]
      }
    },
    components:{AppSlot},
    created() {
      /*console.log(this);
      this.$store.commit('add')*/
    },
    methods: {
      btn(val){
        console.log(val);
      }
    },
  })
</script>
