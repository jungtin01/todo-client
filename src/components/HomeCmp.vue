`<template>
  <section
    id="home"
    class="hero-wrap js-fullheight"
    style="background-image: url(images/bg-1.jpg);"
    data-stellar-background-ratio="0.5"
  >
    <div class="overlay"></div>
    <div class="container ftco-animate">
      <div
        class="row no-gutters slider-text js-fullheight align-items-center justify-content-center"
      >
        <div class="col-lg-4 col-md-12 d-none d-md-block">
          <label-form-cmp></label-form-cmp>
          <todo-form-cmp></todo-form-cmp>
        </div>
        <div class="offset-lg-1 col-lg-7 col-md-12 ftco-animate" id="heading-todo">
          <div class="col-md-12 heading-section">
            <h2 class="mb-3">Todo List</h2>
            <div class="form-group form-inline">
              <select 
                class="form-control-sm rounded-pill 
                  custom-select custom-select-sm w-50 ml-3"
                v-model="todoFilter"
              >
                <option :value="null" selected>No filter</option>
                <option v-for="label in labels"
                  :key="label.id"
                  :value="label.id"
                >
                  {{ label.title }}
                </option>
              </select>
              <button
                class="btn btn-sm btn-success rounded-left ml-3 d-block d-md-none"
                @click="triggerMainModal()"
              >Add Todo</button>
            </div>
          </div>

          <table class="table table-borderless text-white">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Num of tasks</th>
              </tr>
            </thead>
            <tbody class="todo-item-container">
              <todo-item-heading-cmp v-for="todo in getTodos" 
              :todo="todo"
              :key="todo.id">
              </todo-item-heading-cmp>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.min.js";
import { mapState } from "vuex"

import LabelFormCmp from "@/components/label/LabelFormCmp.vue";
import TodoFormCmp from "@/components/todo/TodoFormCmp.vue";
import TodoItemHeadingCmp from "@/components/todo/TodoItemHeadingCmp.vue";

export default {
  components: {
    LabelFormCmp,
    TodoItemHeadingCmp,
    TodoFormCmp,
  },
  data() {
    return {
      todoFilter: null
    };
  },
  methods: {
    triggerMainModal() {
      $(document).ready(function () {
        $("#main-modal").modal("show");
      });
    }
  },
  computed: {
    ...mapState({
      labels: (state) => state.label.labels,
    }),
    getTodos() {
      return this.$store.getters["todo/getTodos"](this.todoFilter);
    }
  },
};
</script>

<style>
</style>