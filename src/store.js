import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account: "123456",
    name: "李大帅",
    money: 1000,
    identity: "user"
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
