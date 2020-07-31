import Vue from "vue"

const state = {
    toasts: []
}

const getters = {
    getIndex: state => id => 
        state.toasts.map(toast => toast.id).indexOf(id)
}

const mutations = {
    add(state, toast) {
        Vue.set(toast, "id", Math.random().toString(36).substring(7));
        
        state.toasts.push(toast);
        return toast;
    },

    remove(state, index) {
        state.toasts.splice(index, 1);
    }
}

const actions = {
    add({commit}, toast) {
        return commit("add", toast);
    },

    remove({commit, getters}, id) {
        const index = getters.getIndex(id);
        if(index == -1)
            return;

        return commit("remove", index);
    } 
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}