import Vue from 'vue'
import Router from 'vue-router'

// user
import home from './components/home.vue'
import cart from './components/cart.vue'
import order from './components/order.vue'
import userInfo from './components/userInfo.vue'

// import global from './common.vue'
Vue.use(Router)

var router = new Router({
  routes: [
    // path name component
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home
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
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')) {
    // console.log("get success");
    next();
  } else {
    console.log("no token!");
    // window.location.href = global.login_location
    next();
  }
})

export default router
