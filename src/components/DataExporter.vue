<template>
    <Card class="m-2">
        <template #header>
            Data View
        </template>
        <template #content>
            <DataTable :value="apiStore.dataItems" lazy paginator :loading="apiStore.loadingData" :rows="10"
                :rowsPerPageOptions="[10, 25, 50, 100]" class="p-datatable-small">
                <template #header>
                    <div style="text-align:left">
                        <MultiSelect :modelValue="apiStore.displayFields" :options="apiStore.allFields" optionLabel="name"
                            @update:modelValue="apiStore.toggleColumn" display="chip" placeholder="Select Columns"
                            class="w-full" />
                    </div>
                </template>
                <Column v-for="col in apiStore.displayFields" :key="col.item" :field="col.item //@ts-ignore
                    " :header="$filters.capitalize(col.name)" sortable></Column>
            </DataTable>
        </template>
    </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import MultiSelect from 'primevue/multiselect';

import { useApiStore } from '@/stores/api';

const apiStore = useApiStore();
</script>

<style scoped></style>