<template>
    <tr>
      <th scope="row">1</th>
      <td>
        Todo :
        <a href="javascript:void(0)" 
          @click="triggerTaskModal"
          class="heading-todo-title trigger-task-modal">
          {{ todo.title }}
        </a>
      </td>
      <td>7</td>
    </tr>
</template>

<script>
import $ from "jquery"
import 'bootstrap/dist/js/bootstrap.min.js';

export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    triggerTaskModal() {
      this.$store.dispatch("modal/changeTodo", this.todo);
      
      $(document).ready(function() {
        $('#task-modal').modal('show');
      });
    }
  }
};
</script>

<style>
</style>