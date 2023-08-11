<script setup lang="ts">
import { onBeforeMount } from "vue";
import { RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";
import { useMainStore } from "@/stores/main";

const currentYear = new Date().getFullYear();

const mainStore = useMainStore();
onBeforeMount(async () => {
  await mainStore.hyrdate();
});
</script>

<template>
  <Navigation />
  <RouterView />
  <footer class="text-center p-2">
    <hr />
    Copyright &copy; {{ currentYear }} CollegeFootballData.com
  </footer>
</template>

<style scoped></style>
