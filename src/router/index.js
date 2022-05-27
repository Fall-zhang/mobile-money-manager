import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import About from '../views/about'
import Setting from '../views/setting'

import home_create from '../views/home/HomeCreate.vue'
import home_details from '../views/home/HomeDetails.vue'
import home_edit from '../views/home/HomeEdit.vue'

import setting_tag from '../views/setting/SettingTag.vue'
import setting_member from '../views/setting/SettingMember.vue'
import setting_budget from '../views/setting/SettingBudget.vue'

Vue.use(VueRouter)

const routes = [
  // 重定向到 home
  {
    path: '/',
    redirect: '/home',
  },
  // home 路由配置
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/home/create',
        name: 'home_create',
        component: home_create
      }, {
        path: '/home/details',
        name: 'home_details',
        component: home_details
      },
      {
        path: '/home/edit',
        name: 'home_edit',
        component: home_edit
      }
    ],
    // beforeEnter:(to,from,next)=>{
    //   console.log(to);
    //   console.log(from);
    //   // console.log(to);
    //   next()
    // }
  },
  // about 路由配置
  {
    path: '/about',
    name: 'About',
    component: About
  },
  // 设置页面的路由配置
  {
    path: '/setting',
    name: 'Setting',
    component: Setting,
    children: [
      {
        path: '/setting/tag',
        name: 'setting_tag',
        component: setting_tag
      },
      {
        path: '/setting/member',
        name: 'setting_member',
        component: setting_member
      },
      {
        path: '/setting/budget',
        name: 'setting_budget',
        component: setting_budget
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   console.log('------------to------------');
//   console.log(to);
//   console.log('------------from----------');
//   console.log(from);
//   console.log('------------next----------');
//   console.log(next);
//   next()
//   return false
// })

export default router
