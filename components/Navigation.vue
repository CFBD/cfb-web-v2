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
    <template #item="{ item, props, hasSubmenu }">
      <router-link
        v-if="item.route"
        v-slot="{ href, navigate }"
        :to="item.route"
        custom
      >
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
        </a>
      </router-link>
      <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
      </a>
    </template>
    <template #end>
      <Button @click="mainStore.toggleDarkMode" text
        ><i :class="`pi pi-${mainStore.darkMode ? 'sun' : 'moon'}`"></i
      ></Button>
    </template>
  </Menubar>
</template>

<script setup lang="ts">
import { useMainStore } from "~/stores/main";
import { useNavigationStore } from "~/stores/navigation";
import Menubar from "primevue/menubar";
import Button from "primevue/button";

const mainStore = useMainStore();
const navigationStore = useNavigationStore();
</script>

<style scoped></style>
