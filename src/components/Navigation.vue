<template>
        <Menubar :model="mainStore.menuItems">
            <template #end>
                <Button @click="mainStore.toggleDarkMode" text><i :class="`pi pi-${mainStore.darkMode ? 'sun' : 'moon'}`"></i></Button>
            </template>
        </Menubar>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores/main';
import Menubar from 'primevue/menubar';

const mainStore = useMainStore();
</script>

<style scoped>

</style>