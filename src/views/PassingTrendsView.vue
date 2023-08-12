<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import Chart from 'primevue/chart';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';

import { computed, onMounted, ref } from 'vue';

import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();

import http from '@/helpers/http';
</script>

<style scoped></style>