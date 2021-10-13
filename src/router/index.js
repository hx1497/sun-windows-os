import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
const routes = [
  {
    path: '/',  
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashBoard" */ '@/views/dashboard.vue'),
    children: [
      {
        path: '/interface',
        name: 'interface',
        component:  () => import('@/views/interface.vue'),
        children: [
          {
            path: '/calculator',
            name: 'calculator',
            component: () => import('@/views/components/calculator.vue'),
            meta: { title: '计算器', icon: 'calculator' }
          },
          {
            path: '/todolist',
            name: 'todolist',
            component: () => import('@/views/components/todolist.vue'),
            meta: { title: '待办事项', icon: 'note' }
          }
        ]
      },
    ]
  },
  {
    path: '/login',
    name: 'login',

    component: () => import(/* webpackChunkName: "login" */ '@/views/login.vue')
  },
/*   {
    path: '*',
    name: '404',
    component: () => import('@/views/404.vue'),
    meta: { hidden: true }
  } */

]

const LOGIN_NAME = 'login'
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // store.commit('SET_LIST', routes)
  const token = localStorage.getItem('token')
  // 如果没有token且进入页面不是login，跳转到login页面
  if(!token && to.name !== LOGIN_NAME) {
    next( {name: LOGIN_NAME})
  }else if(!token && to.name === LOGIN_NAME) {
    // 如果没token但进入的是login，则放行
    next()
  }else {
    //如果登录了
    if(!store.state.hasGetRoute) {
      // 如果没拿到路由信息，先拿路由信息,保存到store
      store.commit('SET_ROUTE', routes)
      next()
    }else{
      if(to.path === '/dashboard') {
        console.log(to.path)
        next('/')
      }
      next()
    }
  }
 
})

export default router
