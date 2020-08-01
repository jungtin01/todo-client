<template>
  <div class="modal fade" id="task-modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content text-dark">
        <div class="modal-header">
          <h5 class="modal-title text-dark">Insert Task</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>
            <span class="font-weight-bold">Todo ID</span> :
            <span id="task-modal-id">{{ todo.id }}</span>
          </p>
          <p>
            <span class="font-weight-bold">Title</span> :
            <span id="task-modal-title">{{ todo.title }}</span>
          </p>
          <div class="form-group mt-3">
            <label class="font-weight-bold">Tasks</label>
            <form @submit.prevent="addTask">
              <input
                type="text"
                class="form-control form-control-modal"
                v-model="form.content"
                placeholder="...tell me what you gonna do next !"
              />
              <button type="submit" class="btn btn-sm btn-success rounded-0 mt-3">Add</button>
            </form>

            <table class="table table-borderless mt-3">
              <tbody>
                <tr v-for="task in todo.tasks" :key="task.id">
                  <td>
                    <input
                      type="checkbox"
                      :checked="task.isDone"
                      @change="triggerCheckbox(task.id, $event)"
                    />
                  </td>
                  <td :class="{'task-done': task.isDone}">{{ task.content }}</td>
                  <td>
                    <button
                      @click="removeTask(task.id)"
                      class="btn btn-sm btn-outline-danger rounded-0"
                    >Remove</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- End table -->
          </div>
          <!-- End Modal Body -->
        </div>
      </div>
    </div>
  </div>
  <!-- End TaskModal -->
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      form: {
        content: null,
      },
    };
  },
  computed: {
    ...mapState({
      todo: (state) => state.modal.todo,
    }),
  },
  methods: {
    triggerCheckbox(id, $event) {
      this.$store.dispatch("task/update", {
        taskId: id,
        todoId: this.todo.id,
        done: $event.target.checked,
      });
    },
    addTask() {
      const task = new this.Task(this.form.content);
      this.$store.dispatch("task/insert", {
        task,
        todoId: this.todo.id,
      });
      // reset form
      this.resetForm();
    },
    resetForm() {
      this.form.content = null;
    },
    Task(content) {
      this.content = content;
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