<script setup lang="ts">
import { RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";

const currentYear = new Date().getFullYear();
</script>

<template>
  <Navigation />
  <RouterView />
  <footer class="text-center">
    Copyright &copy; {{ currentYear }} CollegeFootballData.com
  </footer>
</template>

<style scoped></style>
