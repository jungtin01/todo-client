import Vue from "vue"

const state = {
    sequences: 1
}

const getters = {
}

const mutations = {
}

const actions = {
    insert({state, rootState, rootGetters}, {task, todoId}) {
        Vue.set(task, "id", ++state.sequences);
        const todoIndex = rootGetters["todo/getIndex"](todoId);
        rootState.todo.todos[todoIndex].tasks.push(task);

        // xíu nữa thử getters getTask
    },

    remove ({rootState, rootGetters}, {taskId, todoId}) {
        const todoIndex = rootGetters["todo/getIndex"](todoId);
        const taskIndex = rootGetters["todo/getTaskIndex"]({todoIndex, taskId});
        rootState.todo.todos[todoIndex].tasks.splice(taskIndex, 1);
    },
    
    finishTask({rootState, rootGetters}, {taskId, todoId, done}) {
        const todoIndex = rootGetters["todo/getIndex"](todoId);
        const taskIndex = rootGetters["todo/getTaskIndex"]({todoIndex, taskId});
        var task = rootState.todo.todos[todoIndex].tasks[taskIndex];
        Vue.set(task,"done", done);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}