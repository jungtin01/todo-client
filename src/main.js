import Vue from "vue"
import Vuex from "vuex"

import state from "./stores/state"
import getters from "./stores/getters"
import mutations from "./stores/mutations"
import actions from "./stores/actions"
import labelStore from "./stores/module/label/label-store"
import todoStore from "./stores/module/todo/todo-store"
import taskStore from "./stores/module/task/task-store"
import toastStore from "./stores/module/toast/toast-store"
import modalStore from "./stores/module/modal/modal-store"

// cmp
import App from "./App.vue"


Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    label: labelStore,
    toast: toastStore,
    todo: todoStore,
    task: taskStore,
    modal: modalStore,
  }
})

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");