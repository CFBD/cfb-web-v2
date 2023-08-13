<template>
    <Card class="m-3">
        <template #header>
            Data View
        </template>
        <template #content>
            <DataTable ref="dt" :value="apiStore.dataItems" lazy paginator :loading="apiStore.loadingData" :rows="10"
                :rowsPerPageOptions="[10, 25, 50, 100]" class="p-datatable-small">
                <template #header>
                    <div style="text-align:left">
                        <MultiSelect :modelValue="apiStore.displayFields" :options="apiStore.allFields" optionLabel="name"
                            @update:modelValue="apiStore.toggleColumn" display="chip" placeholder="Select Columns"
                            class="w-full" />
                    </div>
                    <div style="text-align:center" class="mt-3">
                        <Button icon="pi pi-external-link" label="Export" @click="exportCSV" />
                    </div>
                </template>
                <Column v-for=" col  in  apiStore.displayFields " :key="col.item" :field="col.item //@ts-ignore
                    " :header="$filters.capitalize(col.name)" sortable></Column>
            </DataTable>
        </template>
    </Card>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import MultiSelect from 'primevue/multiselect';

import { useApiStore } from '@/stores/api';
import { ref } from 'vue';

const apiStore = useApiStore();

const dt = ref();

const exportCSV = () => {
    dt.value.exportCSV();
}
</script>

<style scoped></style>