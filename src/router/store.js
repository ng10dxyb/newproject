import Vue from 'vue'
import Vuex from 'Vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    mainStates:[],
    sideStates:JSON.parse(sessionStorage.getItem('sideStates')),
    username:sessionStorage.userName
  },
  getters:{
    sideStates:state => state.sideStates,
    username:state=>state.username
  },
  mutations:{
    upSide(state,arr){
      state.sideStates=arr;
    },
    out(state){
      state.username="";
      sessionStorage.userId=false;
    },
    setUser(state,val){
      state.username=val;
    }
  }
})
