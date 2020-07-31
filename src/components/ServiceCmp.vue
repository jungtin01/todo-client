<template>
  <section id="services" class="ftco-section">
    <div class="container todo-item-container">
      <div class="row">
        <div class="col-md-5 heading-section ftco-animate pb-5">
          <h2 class="mb-4">All of Todos</h2>
          <p>
            You can see & checkout of every todos here.
          </p>
        </div>
      </div>
      <div class="row">
        <todo-item-service-cmp 
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo">
        </todo-item-service-cmp>
      </div>
    </div>
  </section>
</template>

<script>
import {mapState} from "vuex"
import TodoItemServiceCmp from "@/components/todo/TodoItemServiceCmp.vue"
export default {
  components: {
    TodoItemServiceCmp
  },
  computed: {
    ...mapState({
      todos: state => state.todo.todos
    })
  }
};
</script>

<style>
</style>