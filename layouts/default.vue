<script setup lang="ts">
  import { useMainStore } from "~/stores/main";

  const currentYear = new Date().getFullYear();

  const mainStore = useMainStore();
  await mainStore.hyrdate();
</script>

<template>
  <Navigation />
  <slot />
  <footer class="text-center p-2">
    <hr />
    Copyright &copy; {{ currentYear }} CollegeFootballData.com
  </footer>
</template>
