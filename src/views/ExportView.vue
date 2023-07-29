<template>
  <div class="text-center">
    <!-- <div class="text-5xl font-bold mt-2">Data Search</div>
    <div class="text-lg text-700">What data are you trying to find?</div>
    <div class="mt-4">
      <Dropdown
        v-model="apiStore.selectedEndpoint"
        :options="apiStore.endpoints"
        optionLabel="summary"
        filter
        :pt="{
          root: { class: 'w-5' },
        }"
      />
    </div> -->
    <Fieldset legend="Data Categories" class="text-left m-2" toggleable>
      <div class="text-center mb-5">
        <InputText
          v-model="apiStore.endpointFilter"
          placeholder="Start typing to filter categories"
          size="large"
          type="text"
          :pt="{
            root: { class: 'w-5' },
          }"
        />
      </div>
      <div class="grid">
        <div
          class="col-3"
          v-for="category in apiStore.filteredCategories"
          :key="category"
        >
          <div class="text-lg font-bold">
            {{
              //@ts-ignore
              $filters.capitalize(category)
            }}
          </div>
          <div>
            <ul>
              <li
                v-for="endpoint in apiStore.getCategoryEndpoints(category)"
                :key="endpoint.key"
              >
                {{ endpoint.summary }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fieldset>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useApiStore } from "@/stores/api";

import Fieldset from "primevue/fieldset";
import InputText from "primevue/inputtext";

const apiStore = useApiStore();

onBeforeMount(async () => {
  await apiStore.getDocs();
});
</script>

<style scoped></style>
