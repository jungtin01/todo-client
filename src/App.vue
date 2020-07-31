<template>
  <div id="app">
    <navbar-cmp></navbar-cmp>
    <home-cmp></home-cmp>
    <service-cmp></service-cmp>
    <footer-cmp></footer-cmp>

    <!-- Modal -->
    <main-modal-cmp></main-modal-cmp>
    <task-modal-cmp></task-modal-cmp>
  </div>
</template>

<script>
import NavbarCmp from "@/components/NavbarCmp.vue"
import HomeCmp from "@/components/HomeCmp.vue"
import ServiceCmp from "@/components/ServiceCmp.vue"
import MainModalCmp from "@/components/modal/MainModalCmp.vue"
import TaskModalCmp from "@/components/modal/TaskModalCmp.vue"
import FooterCmp from "@/components/FooterCmp.vue"

export default {
  components: {
    NavbarCmp,
    HomeCmp,
    ServiceCmp,
    MainModalCmp,
    TaskModalCmp,
    FooterCmp
  },
  data() {
    return {
    }
  },
  methods: {
    
  }
}
</script>

<style>

</style>
