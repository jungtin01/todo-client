<template>
  <div class="col-12 col-md-6">
    <div class="media block-6 services d-block ftco-animate">
      <div class="icon">
        <span class="flaticon-video-camera"></span>
      </div>
      <div class="media-body">
        <h3 class="heading mb-3 trigger-task-modal" @click="triggerTaskModal">Todo : {{ todo.title }}</h3>
        <table class="table table-borderless text-white mt-3" v-if="hasTask">
          <tbody>
            <tr v-for="task in todo.tasks" :key="task.id">
              <td>
                <input
                  type="checkbox"
                  :checked="task.done"
                  @change="triggerCheckbox(task.id, $event)"
                />
              </td>
              <td :class="{'task-done': task.done}">{{ task.content }}</td>
              <td>
                <button
                  @click="removeTask(task.id)"
                  class="btn btn-sm btn-outline-danger rounded-0"
                >Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p style="font-size: 13.5px" v-else>There's no tasks...</p>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery"
import 'bootstrap/dist/js/bootstrap.min.js'

export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    hasTask() {
      return this.todo.tasks.length > 0;
    },
  },
  methods: {
    triggerTaskModal() {
      this.$store.dispatch("modal/changeTodo", this.todo);

      $(document).ready(function () {
        $("#task-modal").modal("show");
      });
    },

    triggerCheckbox(id, $event) {
      this.$store.dispatch("task/finishTask", {
        taskId: id,
        todoId: this.todo.id,
        done: $event.target.checked,
      });
    },

    removeTask(id) {
      this.$store.dispatch("task/remove", {
        taskId: id,
        todoId: this.todo.id,
      });
    },
  },
};
</script>

<style>
</style>