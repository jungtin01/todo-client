<template>
  <div class="custom-control custom-radio mt-1">
    <input type="radio" :id="id" 
        name="label-radio"
        @change="changeLabelRadio"
        class="custom-control-input" />

    <label class="custom-control-label" :for="id">{{ label.title }}</label>
    
    <a class="delete-label" 
      :class="{'text-white': !isModal, 
      'delete-label-black' : isModal}" 
        @click="removeLabel">&times;
    </a>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: Object,
      required: true
    },
    isModal: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  mounted() {
    this.id = Math.random().toString(36).substring(7);
  },
  data() {
    return {
      id: null
    }
  },
  methods: {
    changeLabelRadio() {
      this.$emit("selectLabel", this.label);
    },
    removeLabel() {
      this.$store.dispatch("label/delete", this.label.id);
      this.$emit("removeLabel", this.label.id);
    }
  }
};
</script>

<style>
</style>