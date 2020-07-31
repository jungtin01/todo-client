<template>
  <div class="toast"
  :id="id"
  :data-delay="delayTime"
  :data-autohide="autohide"
  role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header text-white" :class="getStatusClass">
      <strong class="mr-auto text-uppercase">{{ heading }}</strong>
      <small class="text-white">just now</small>
      <button type="button" 
      class="ml-2 mb-1 close" 
      data-dismiss="toast" 
      aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="toast-body text-dark">{{ content }}</div>
  </div>
</template>

<script>
import $ from "jquery";
import 'bootstrap/dist/js/bootstrap.min.js';

export default {
    data() {
        return {
            delayTime: 3000,
            autohide: true,
        }
    },
    computed: {
      getStatusClass() {
        return {
          "bg-danger": !this.success,
          "bg-success": this.success
        };
      }
    },
    props: {
      heading: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      success: {
        type: Boolean,
        required: true
      },
      id: {
        type: String,
        required: true
      }
    },
    mounted() {
      var vm = this;
      $(document).ready(function() {
        $("#" + vm.id).toast('show');
      });

      setTimeout(function() { 
        vm.$store.dispatch("toast/remove", vm.id);
       }, vm.delayTime + 300);
    }
};
</script>

<style>
</style>