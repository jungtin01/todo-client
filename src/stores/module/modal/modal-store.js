const state = {
    todo: {
        id: 12,
        title: 'asd',
        tasks: [
            {
                id: 1,
                title: "task from vue",
                done: true,
                created_date: new Date()
            }
        ],
        updated_date: null,
        created_date: null
    }
}

const getters = {
}

const mutations = {
    changeTodo(state, todo) {
        state.todo = todo;
    }
}

const actions = {
    changeTodo({commit}, todo) {
        commit("changeTodo", todo);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}