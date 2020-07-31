import Vue from "vue"

const state = {
    todos: [],
    sequences: 0
}

const getters = {
    getIndex: state => id => {
        return state.todos.map(todo => todo.id).indexOf(id)
    },

    getTaskIndex: state => ({todoIndex, taskId}) => {
        return state.todos[todoIndex].tasks.map(task => task.id).indexOf(taskId);
    },
    
    getTodos: (state) => labelId => {
        if(labelId === null)
            return state.todos;

        return state.todos.filter(todo => {
            if(todo.labelId === null)
                return false;
            console.log(todo.labelId + " |" + labelId);
            return todo.labelId == labelId;
        });
    }
}

const mutations = {
    save(state, todo) {
        Vue.set(todo, "id", ++state.sequences); // auto increment
        Vue.set(todo, "tasks", []);
        Vue.set(todo, "created_date", new Date());
        state.todos.push(todo);

        return todo;
    },

    update(state, {todo, index}) {
        Vue.set(todo, "updated_date", new Date());
        state.todos[index] = todo;

        return todo;
    },

    delete(state, index) {
        state.todos.splice(index, 1);
    }
}

const actions = {
    save({commit}, todo) {
        return commit("save", todo);
    },

    update({commit, getters}, todo) {
        const index = getters.getIndex(todo.id);
        if(index == -1)
            return;

        return commit("update", {todo, index});
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