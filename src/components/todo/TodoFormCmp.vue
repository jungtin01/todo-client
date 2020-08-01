<template>
  <div>
    <div class="form-group mt-3">
      <label class="text-white">Todo</label>
      <form @submit.prevent="createTodo">
        <input
          type="text"
          class="form-control"
          :class="{'is-invalid': hasTodoError}"
          v-model="form.title"
          placeholder="...tell me what you gonna do next !"
        />
        <div class="invalid-feedback" v-if="hasTodoError">
          <ul>
            <li v-for="(err, i) in form.errors" :key="i">{{ err }}</li>
          </ul>
        </div>

        <button type="submit" 
        class="btn btn-sm btn-outline-success mt-3">Submit</button>
      </form>
    </div>
    <div id="todo-label-container">
      <label-radio-cmp
        v-for="label in labels"
        :label="label"
        @selectLabel="form.label = $event"
        @removeLabel="removeLabel($event)"
        :key="label.id"
      ></label-radio-cmp>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import LabelRadioCmp from "@/components/label/LabelRadioCmp.vue";

export default {
  components: {
    LabelRadioCmp,
  },
  data() {
    return {
      form: {
        title: null,
        label: null,
        errors: [],
      },
    };
  },
  methods: {
    createTodo() {
      // check validation
      if (this.form.label === null) {
        this.form.errors.push("Must select label first !");
        return;
      } else if (this.form.title === null) {
        this.form.errors.push("Todo title must not be blank !");
        return;
      }

      const todo = new this.Todo(this.form.title, this.form.label.id);

      this.$store.dispatch("todo/save", todo);

      // reset labelForm
      this.resetTodoForm();
    },

    resetTodoForm() {
      this.form.title = null;
      this.form.errors = [];
    },

    Todo(title, labelId) {
      this.title = title;
      this.labelId = labelId;
    },

    removeLabel($event) {
      if (this.form.label === null)
        return;

      if (this.form.label.id == $event) this.form.label = null;
    },
  },
  computed: {
    ...mapState({
      labels: (state) => state.label.labels,
    }),
    hasTodoError(state) {
      return state.form.errors.length > 0;
    },
  },
};
</script>

<style>
</style>