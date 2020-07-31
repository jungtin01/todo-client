<template>
  <div class="form-group form-inline">
    <label class="text-white d-block w-100">Label</label>
    <form @submit.prevent="createLabel">
      <input type="text" 
        class="form-control" 
        v-model="form.title" 
        placeholder="...add new label" />
      
      <button type="submit" 
        class="btn btn-sm btn-outline-light ml-3">
        Create Label
      </button>
    </form>
  </div>
</template>

<script>
import { CREATE_SUCCESS_LABEL } from "@/commons/toast-notifications";
export default {
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
      this.resetLabelForm();
      // notify
      this.$store.dispatch("toast/add", CREATE_SUCCESS_LABEL);
    },

    resetLabelForm() {
      this.form.title = null;
    },

    Label(title) {
      this.title = title;
    },
  },
};
</script>

<style>
</style>