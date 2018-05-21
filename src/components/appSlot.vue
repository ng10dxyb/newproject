<template>
  <div>
    大家好，我是appSlot组件
  <slot name="item" v-for="i in items" :t="i.text" :a="1">sss</slot>
  </div>
</template>
<script>
  export default ({
    props:['items'],
    data(){
      return{
        ss:2
      }
    },
    created() {
      console.log(this.items);
      /*console.log(this);
      this.$store.commit('add')*/
    }
  })
</script>
