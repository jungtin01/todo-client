<template>
  <div>
    <nav id="navbar" class="navbar d-none d-md-block">
      <ul class="nav-menu">
        <li>
          <a data-scroll="home" href="#home" class="dot active">
            <span>Home</span>
          </a>
        </li>
        <li>
          <a data-scroll="services" href="#services" class="dot">
            <span>Services</span>
          </a>
        </li>
      </ul>
    </nav>
    <!-- Position it -->
    <div id="toast-container">
      <toast-cmp v-for="toast in toasts"
        :key="toast.id"

        :id="toast.id"
        :heading="toast.heading"
        :content="toast.content"
        :success="toast.success"
      ></toast-cmp>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
import ToastCmp from "./ToastCmp.vue"

export default {
  components: {
    ToastCmp
  },
  computed: {
    ...mapState({
      toasts: state => state.toast.toasts
    })
  }
};
</script>

<style>
</style>