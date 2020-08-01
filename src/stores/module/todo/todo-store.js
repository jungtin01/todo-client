import axios from "axios"
import { 
    TODO,
} from "@/commons/toast-notifications"

const state = {
    todos: [],
    filteredTodos: []
}

const getters = {
    getIndex: state => id => {
        return state.todos.map(todo => todo.id).indexOf(id)
    },

    getTaskIndex: state => ({todoIndex, taskId}) => {
        return state.todos[todoIndex].tasks.map(task => task.id).indexOf(taskId);
    },
    
}

const mutations = {
    save(state, todo) {
        state.todos.push(todo);
    },

    update(state, {todo, index}) {
        state.todos[index] = todo;
    },

    delete(state, index) {
        state.todos.splice(index, 1);
    },

    load(state, todos) {
        state.todos = todos;
    },

    loadFilteredTodos(state, todos) {
        state.filteredTodos = todos;
    }
}

const actions = {
    async save({commit, dispatch}, todo) {
        var dto = todo;
        try {
            const res = await axios.post("/todos", dto);
            console.log(dto);
            commit("save", res.data);
            // notify
            dispatch("toast/add", TODO.CREATE.SUCCESS, { root: true });
        } catch(err) {
            dispatch("toast/add", TODO.CREATE.FAIL, { root: true });
        }
    },

    async update({commit, getters, dispatch}, todo) {
        const dto = todo;
        try {
            await axios.put(`/todos/${todo.id}`, dto);

            const index = getters.getIndex(todo.id);
            if(index == -1)
                return;

            commit("update", {todo, index});
            // notify
            dispatch("toast/add", TODO.UPDATE.SUCCESS, { root: true });
        } catch(err) {
            dispatch("toast/add", TODO.UPDATE.FAIL, { root: true });
        }
    },

    async delete({commit, getters, dispatch}, id) {
        try {
            await axios.delete(`/todos/${id}`);
            const index = getters.getIndex(id);
            if(index == -1)
                return;

            commit("delete", index);
            // notify
            dispatch("toast/add", TODO.DELETE.SUCCESS, { root: true });
        } catch(err) {
            dispatch("toast/add", TODO.DELETE.FAIL, { root: true });
        }
    },

    async load({commit}) {
        const res = await axios.get("/todos?withtask=true");
        const todos = res.data.content;
        commit("load", todos);
    },

    async loadFilteredTodos({commit, state}, labelId) {
        try {
            if(labelId == null || labelId == '') {
                const res = await axios.get("/todos");
                const todos = res.data.content;
                state.filteredTodos = todos;
                return;
            }
    
            const res = await axios.get(`labels/${labelId}`);
            const todos = res.data.todos;
            commit("loadFilteredTodos", todos);
        } catch(err) {
            console.log(err);
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}