import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account: "123456",
    name: "李大帅",
    money: 9999,
    identity: "user",
    receive: "河南省安阳市文峰区安阳工学院 李大帅 12345678789"
  },
  mutations: {
    setData(state,obj){
      for(let key in obj){
        state[key] = obj[key];
      }
    }
  },
  actions: {

  }
})
