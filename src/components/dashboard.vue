<template>
  <div class="container">
    <div class="user">
      <div class="pic"></div>
      <div class="username">hello,{{username}}!</div>
    </div>
    <div class='bar'>
      <div class="nav" v-for="item in labelMenu" @click="getMenuList(item)">{{item.label_name}}</div>
      <div class='nav' @click="out">退出</div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        labelMenu: [{
          label_name: '点击1',
          label_id: 1,
          label_title:"home1",
        },
          {
            label_name: '点击2',
            label_id: 2,
            label_title:"home2",
          },
          {
            label_name: '点击3',
            label_id: 3,
            label_title:"home3",
          }, {
            label_name: '点击4',
            label_id: 4,
            label_title:"home4",
          }

        ]
      }
    },
    computed: {
      ...mapGetters([
        'username',
      ])
    },
    methods: {
      out(){
        this.$store.commit("out")
        this.$router.push({name: '*'})

      },
      getMenuList(item){
        if(item){
          let _arr=[1,2,3,4];
          let pamans=[];
          for(let k in _arr){
            pamans.push({title:item.label_title+_arr[k],path:'/vue/'+item.label_title+'/children'+_arr[k]});
          }
          sessionStorage.setItem('sideStates', JSON.stringify(pamans));
          this.$store.commit("upSide",pamans)
        }
      }
    }
  }
</script>
<style scoped>
    .user{
      float: left;
      margin-top: -12px;
     /* margin-left: 100px;*/
    }
    .user div{
      float: left;
      line-height: 50px;
      margin-left: 20px;
    }
    .pic{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: url("../img/user.png") center center;
      background-size: 50px 50px;
    }
    .container{
      margin-right: 100px;
      margin-top: 30px;
    }
    .bar{
      float: right;
    }
    .container .nav{
      cursor: pointer;
      float: left;
      padding: 5px 20px;
    }
</style>
