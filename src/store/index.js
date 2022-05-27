import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    settingTag: [], // 标签
    familyConsumer: [], // 家庭成员,表示消费人员
    payHistory: [] // 表示消费记录
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
