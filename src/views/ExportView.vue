<template>
  <div class="text-center">
    <Fieldset
      legend="Data Categories"
      class="text-left m-2"
      :collapsed="apiStore.collapseSelections"
      @toggle="apiStore.toggleCategories"
      toggleable
    >
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
            <ul class="endpoint-list">
              <li
                v-for="endpoint in apiStore.getCategoryEndpoints(category)"
                :key="endpoint.key"
              >
                <Button
                  class="text-left"
                  @click="apiStore.selectPath(endpoint.key)"
                  link
                  >{{ endpoint.summary }}</Button
                >
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
import { onBeforeRouteUpdate } from "vue-router";

import Button from "primevue/button";
import Fieldset from "primevue/fieldset";
import InputText from "primevue/inputtext";

const apiStore = useApiStore();

onBeforeMount(async () => {
  apiStore.resetParams();
  await apiStore.getDocs();
});

onBeforeRouteUpdate((to, from) => {
  if (from.name !== 'exporter') {
    apiStore.resetParams();
  }

  if (to.name === 'exporter') {
    apiStore.updateParams(to);
  }
});
</script>

<style lang="scss" scoped>
.endpoint-list {
  list-style: none;
}
</style>
