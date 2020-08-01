import Vue from "vue"
import axios from "axios"

import { 
    TASK
} from "@/commons/toast-notifications"

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {
    async insert({rootState, rootGetters, dispatch}, {task, todoId}) {
        try {
            const dto = task;
            const res = await axios.post(`/todos/${todoId}/tasks`, dto);

            const todoIndex = rootGetters["todo/getIndex"](todoId);

            if(rootState.todo.todos[todoIndex].tasks == null) {
                rootState.todo.todos[todoIndex].tasks = [res.data];
            }
            else
                rootState.todo.todos[todoIndex].tasks.push(res.data);

            // notify
            dispatch("toast/add", TASK.CREATE.SUCCESS, { root: true });
        } catch(err) {
            dispatch("toast/add", TASK.CREATE.FAIL, { root: true });
        }

        // xíu nữa thử getters getTask
    },

    async remove ({rootState, rootGetters, dispatch}, {taskId, todoId}) {
        try {
            await axios.delete(`/tasks/${taskId}`);
        
            const todoIndex = rootGetters["todo/getIndex"](todoId);
            const taskIndex = rootGetters["todo/getTaskIndex"]({todoIndex, taskId});
            rootState.todo.todos[todoIndex].tasks.splice(taskIndex, 1);

            // notify
            dispatch("toast/add", TASK.DELETE.SUCCESS, { root: true });
        } catch(err) {
            dispatch("toast/add", TASK.DELETE.FAIL, { root: true });
        }
    },
    
    async update({rootState, rootGetters, dispatch}, {taskId, todoId, done}) {
        try {
            const dto = {
                isDone: done
            }
            await axios.put(`/tasks/${taskId}`, dto);

            const todoIndex = rootGetters["todo/getIndex"](todoId);
            const taskIndex = rootGetters["todo/getTaskIndex"]({todoIndex, taskId});
            var task = rootState.todo.todos[todoIndex].tasks[taskIndex];
            Vue.set(task, "isDone", done)

            // notify
            dispatch("toast/add", TASK.UPDATE.SUCCESS, { root: true });
        } catch(err) {
            dispatch("toast/add", TASK.UPDATE.FAIL, { root: true });
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