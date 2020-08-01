import axios from "axios"
import { 
    LABEL
} from "@/commons/toast-notifications"

const state = {
    labels: [],
}

const getters = {
    getIndex: state => id => 
        state.labels.map(label => label.id).indexOf(id)

    
}

const mutations = {
    save(state, label) {
        state.labels.push(label);
    },

    update(state, {label, index}) {
        state.labels[index] = label;
    },

    delete(state, index) {
        state.labels.splice(index, 1);
    },

    load(state, labels) {
        state.labels = labels;
    }
}

const actions = {
    async save({commit, dispatch}, label) {
        try {
            const res = await axios.post("/labels", label);
            commit("save", res.data);
            // notify
            dispatch("toast/add", LABEL.CREATE.SUCCESS, { root: true });
        } catch(err) {
            dispatch("toast/add", LABEL.CREATE.FAIL, { root: true });
        }
    },

    async update({commit, getters, dispatch}, label) {
        const dto = {
            title: label.title
        };
        try {
            await axios.put(`/labels/${label.id}`, dto);

            const index = getters.getIndex(label.id);
            if(index == -1)
                return;

            commit("update", {label, index});
            // notify
            dispatch("toast/add", LABEL.UPDATE.SUCCESS, { root: true });
        } catch(err) {
            dispatch("toast/add", LABEL.UPDATE.FAIL, { root: true });
        }
    },

    async delete({commit, getters, dispatch}, id) {
        try {
            await axios.delete(`/labels/${id}`);
            const index = getters.getIndex(id);
            if(index == -1)
                return;

            commit("delete", index);
            // notify
            dispatch("toast/add", LABEL.DELETE.SUCCESS, { root: true });
        } catch(err) {
            dispatch("toast/add", LABEL.DELETE.FAIL, { root: true });
        }
    },

    async load({commit}) {
        const res = await axios.get("/labels");
        const labels = res.data.content;
        commit("load", labels);
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}