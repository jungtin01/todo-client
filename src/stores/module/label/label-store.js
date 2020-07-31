import Vue from "vue"

const state = {
    labels: [
        {
            id: 1,
            title: "sample label from vuex",
            updated_date: null,
            created_date: new Date()
        }
    ],
    sequences: 1
}

const getters = {
    getIndex: state => id => 
        state.labels.map(label => label.id).indexOf(id)

    
}

const mutations = {
    save(state, label) {
        Vue.set(label, "id", ++state.sequences); // auto increment
        Vue.set(label, "created_date", new Date());
        state.labels.push(label);

        return label;
    },

    update(state, {label, index}) {
        Vue.set(label, "updated_date", new Date());
        state.labels[index] = label;

        return label;
    },

    delete(state, index) {
        state.labels.splice(index, 1);
    }
}

const actions = {
    save({commit}, label) {
        return commit("save", label);
    },

    update({commit, getters}, label) {
        const index = getters.getIndex(label.id);
        if(index == -1)
            return;

        return commit("update", {label, index});
    },

    delete({commit, getters}, id) {
        const index = getters.getIndex(id);
        if(index == -1)
            return;

        return commit("delete", index);
    } 
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}