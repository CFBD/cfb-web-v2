<template>
  <div class="text-center">
    <Fieldset legend="Data Categories" class="text-left m-3" :collapsed="apiStore.collapseSelections"
      @toggle="apiStore.toggleCategories" toggleable>
      <div class="text-center mb-5">
        <InputText v-model="apiStore.endpointFilter" placeholder="Start typing to filter categories" size="large"
          type="text" :pt="{
            root: { class: 'w-5' },
          }" />
      </div>
      <div class="grid">
        <div class="col-12 md:col-6 lg:col-3" v-for="category in apiStore.filteredCategories" :key="category">
          <div class="text-lg font-bold">
            {{
              capitalize(category)
            }}
          </div>
          <div>
            <ul class="endpoint-list">
              <li v-for="endpoint in apiStore.getCategoryEndpoints(category)" :key="endpoint.key">
                <NuxtLink :to="`/exporter${endpoint.key}`">
                  <Button class="text-left" link>{{ endpoint.description }}</Button>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fieldset>
    <EndpointForm v-if="apiStore.showEndpointForm"></EndpointForm>
    <DataExporter v-if="apiStore.showDataTable"></DataExporter>
    <Toast></Toast>
  </div>
</template>

<script setup lang="ts">
import { useApiStore } from "~/stores/api";
import { capitalize } from "~/utils";

const route = useRoute();

const apiStore = useApiStore();

onBeforeMount(async () => {
  await apiStore.getDocs();
  apiStore.updateParams(route);
});
</script>

<style lang="scss" scoped>
.endpoint-list {
  list-style: none;
}
</style>
