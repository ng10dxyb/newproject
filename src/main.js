// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './router/store'
import './style/reset.css'
import img from './router/img'
Vue.config.productionTip = false
/* eslint-disable no-new */
const whiteList = ['/passport/login'];
router.beforeEach((to,from,next) =>{
  console.log(to);
  console.log(from);
  if(sessionStorage.userId=="true"){
    if(to.path==='/passport/login'){
      next()
    }else {
      next()
    }
  }else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    }
    else {
      next({name: 'login'});
    }
  }
})
Vue.prototype.$img=img;
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
