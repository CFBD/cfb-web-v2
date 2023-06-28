<template>
  <Menubar :model="mainStore.menuItems">
    <template #start>
      <img alt="logo" src="rcfb1200.png" height="40" class="mr-2" />
    </template>
    <template #end>
      <Button @click="mainStore.toggleDarkMode" text
        ><i :class="`pi pi-${mainStore.darkMode ? 'sun' : 'moon'}`"></i
      ></Button>
    </template>
  </Menubar>
</template>

<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import Menubar from "primevue/menubar";
import Button from "primevue/button";

const mainStore = useMainStore();
</script>

<style scoped></style>
