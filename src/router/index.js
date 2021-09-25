import Vue from 'vue'
import Router from 'vue-router'
import Login from '../page/Login'
import home from '../page/home'
import goodsCreate from '../page/Goods/create'
import goodsList from '../page/Goods/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children:[
        {
          path: '/goods/Create',
          name: 'goodsCreate',
          component: goodsCreate
        },
        {
          path: '/goods/list',
          name: 'goodsList',
          component: goodsList
        }
      ]
    }
  ]
})