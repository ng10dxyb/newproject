<template>
  <section class="main">
    <transition name="fade" mode="out-in">
      <router-view :key=""></router-view>
    </transition>
  </section>
</template>
<script>
  export default {

  }
</script>
<style scoped>

</style>
