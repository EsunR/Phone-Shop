import Vue from 'vue'
import Router from 'vue-router'
import global from './common.vue'


// user
import home from './components/home.vue'
import item from './components/item.vue'
import cart from './components/cart.vue'
import order from './components/order.vue'
import userInfo from './components/userInfo.vue'

// admin
import orderManage from './components/admin/orderManage.vue'
import userManage from './components/admin/userManage.vue'
import itemManage from './components/admin/itemManage.vue'
import modifyItem from './components/admin/modifyItem.vue'
import addItem from './components/admin/addItem.vue'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/item/:id',
      component: item
    },
    {
      path: '/cart',
      component: cart
    },
    {
      path: '/order',
      component: order
    },
    {
      path: '/userInfo',
      component: userInfo
    },
    {
      path: '/orderManage',
      component: orderManage
    },
    {
      path: '/userManage',
      component: userManage
    },
    {
      path: '/itemManage',
      component: itemManage
    },
    {
      path: '/itemManage/modifyItem/:id',
      component: modifyItem
    },
    {
      path: '/itemManage/addItem',
      component: addItem
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')) {
    // console.log("get success");
    next();
  } else {
    console.log("no token!");
    window.location.href = global.login_location
    next();
  }
})

export default router
