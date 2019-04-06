import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import global from './common.vue'
import moment from 'moment'
import './plugins/element.js'
import './assets/style.css'


// 将引入的全局设置文件绑定到Vue的COMMON属性上
Vue.prototype.COMMON = global
moment.locale('zh-cn');
Vue.prototype.$moment = moment

// 设置axios
Vue.use(VueAxios, axios);
axios.defaults.baseURL = global.host;
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

Vue.filter('orderStatus', function (status) {
  let code = status.toString();
  switch (code) {
    case '1':
      return '未发货';
    case '2':
      return '已发货';
    case '3':
      return '已确认收货';
    case '4':
      return '申请退货中';
    case '5':
      return '已退货';
    case '6':
      return '拒绝退货';
    case '7':
      return '已评价';
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.config.productionTip = false
