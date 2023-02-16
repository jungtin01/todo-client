import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

import state from "./stores/state"
import getters from "./stores/getters"
import mutations from "./stores/mutations"
import actions from "./stores/actions"
import labelStore from "./stores/module/label/label-store"
import todoStore from "./stores/module/todo/todo-store"
import taskStore from "./stores/module/task/task-store"
import toastStore from "./stores/module/toast/toast-store"
import modalStore from "./stores/module/modal/modal-store"

axios.defaults.baseURL = 'http://localhost:9000/todo-app/api';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
delete axios.defaults.headers.common["Authorization"];
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

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