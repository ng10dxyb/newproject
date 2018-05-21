import Vue from 'vue'
import Router from 'vue-router'
import Layout from "../components/Layout"
import login from "../components/login"
import dashboard from "../components/dashboard"
import HelloWorld from '@/components/HelloWorld'
import children from '../components/children'
import children1 from '../components/children1'

Vue.use(Router)
var Home = {
  template:"<div>home</div>"
}
var Foo = {
  template:"<div>nav</div>"
}
var Bar = {
  template:
    `
            <div>
                about
                <div style="height:200px;"></div>
                <p id="red" style="height:500px;background: red;color:#fff">红色页面</p>
                <p id="blue" style="height:300px;background: blue;color:#fff">蓝色页面</p>
            </div>
        `
}
var a = 111;
export default new Router({
  mode: 'history',
  /*scrollBehavior(to, from, savedPosition) {
    console.log(to.hash);
    console.log(savedPosition);
    //判断如果滚动条的位置存在直接返回到当前位置，否者返回到起点
    if (savedPosition) {
      return savedPosition
    } else {
      if (to.hash) {
        console.log(1);
        return {selector: to.hash}
      }
    }
  },*/
  routes: [
    {
      path: '*',
      component: Layout,
      redirect: '/dashboard',
      name: 'Home',
      children: [
        {path: 'dashboard', component: resolve => require(['../components/children.vue'], resolve)},
        {path: 'login1', name: 'login1', component: login},
      ]
    },
    {
      path: '/passport/login',
      component: login,
      name: 'login',
    },
    {
      path: '/vue',
      component: Layout,
      name: "children",
      children: [
        {path: 'home1/children1', component: resolve => require(['../components/children1.vue'], resolve)},
        {path: 'home1/children2', component: resolve => require(['../components/children2.vue'], resolve)},
        {path: 'home1/children3', component: resolve => require(['../components/children3.vue'], resolve)},
        {path: 'home1/children4', component: resolve => require(['../components/children4.vue'], resolve)},
        {
          path: 'home2/children1', name: "yb", component: resolve => require(['../components/slot.vue'], resolve),
          children: [{
            path: 'a/:id', name: "yb2", component: resolve => require(['../components/HelloWorld.vue'], resolve)
          }]
        },
        {
          path: 'home2/children2',
          name: "yb1",
          /*redirect: { name: 'yb' },*/
          component: resolve => require(['../components/UserSettings.vue'], resolve),
          children: [{
            path: 'b/:id',
            name: "yb3",
            components: {
              bar1: resolve => require(['../components/HelloWorld.vue'], resolve),
              bar2: resolve => require(['../components/children4.vue'], resolve),
              default: resolve => require(['../components/children3.vue'], resolve)
            }
          }]
        },
        {path: 'home2/children3', component: resolve => require(['../components/scroll.vue'], resolve),
          children: [
            {
              path:"home",component:Home
            },
            {
              path:"foo",component:Foo
            },
            {
              path:"about",component:Bar
            }
          ]
        },
      ]
    }
    /*{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children:[{
          name:"helloChildren",
          path:"/children",
          component:children,
          props: {query:'yb1'}
         /!* props:{yb1:a,yb2:false}*!/
        },
        {
          name:"helloChildren1",
          path:"/children1",
          component:children1
        }
      ]
    }*/
  ],
  fallback:false
})
