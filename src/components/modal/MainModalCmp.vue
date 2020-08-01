<template>
  <div class="modal fade" id="main-modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content text-dark">
        <div class="modal-header">
          <h5 class="modal-title text-dark" id="exampleModalLabel">Create Todo</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group form-inline">
            <label class="d-block w-100">Label</label>
            <input
              type="text"
              class="form-control form-control-modal"
              v-model="form.title"
              placeholder="...add new label"
            />
            <button
              type="submit"
              class="btn btn-sm btn-outline-dark ml-0 ml-sm-3 mt-2 mt-sm-0"
              id="create-lbl-modal-btn"
              @click="createLabel"
            >Create Label</button>
          </div>
          <div class="form-group mt-3">
            <label>Todo</label>
            <input
              type="text"
              class="form-control form-control-modal"
              placeholder="...tell me what you gonna do next !"
            />
            <button type="submit" class="btn btn-sm btn-outline-success mt-3">Submit</button>
          </div>
          <div id="todo-label-container">
            <label-radio-cmp v-for="label in labels" :label="label" :isModal="true" :key="label.id"></label-radio-cmp>
          </div>
        </div>
      </div>
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
      },
    };
  },
  methods: {
    createLabel() {
      const label = new this.Label(this.form.title);

      this.$store.dispatch("label/save", label);

      // reset form
      this.resetForm();
    },

    resetForm() {
      this.form.title = null;
    },

    Label(title) {
      this.title = title;
    },
  },
  computed: {
    ...mapState({
      labels: (state) => state.label.labels,
    }),
  },
};
</script>

<style>
</style>