<template>
  <Menubar :model="navigationStore.menuItems">
    <template #start>
      <img
        alt="logo"
        :src="navigationStore.menuIcon"
        height="40"
        class="mr-2"
      />
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
import { useNavigationStore } from "@/stores/navigation";
import Menubar from "primevue/menubar";
import Button from "primevue/button";

const mainStore = useMainStore();
const navigationStore = useNavigationStore();
</script>

<style scoped></style>
