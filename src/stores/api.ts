import { computed, ref } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";

import http from "@/helpers/http";
import type { DropdownChangeEvent } from "primevue/dropdown";

interface Parameter {
  description: string;
  in: string;
  name: string;
  type: string;
  required: boolean;
  currentValue?: string;
}

interface Path {
  get: {
    description: string;
    operationId: string;
    summary: string;
    tags: string[];
    parameters: Parameter[];
  };
}

export interface Endpoint {
  path: Path;
  category: string;
  summary: string;
  key: string;
}

export const useApiStore = defineStore("api", () => {
  const docs = ref();
  const paths: Ref<string[]> = ref([]);
  const categories: Ref<string[]> = ref([]);
  const endpoints: Ref<Endpoint[]> = ref([]);
  const endpointFilter = ref("");

  const selectedEndpoint: Ref<Endpoint | null> = ref(null);

  const filteredCategories = computed(() =>
    categories.value.filter((c) => getCategoryEndpoints(c).length > 0)
  );

  function getCategoryEndpoints(category: string): Endpoint[] {
    return endpoints.value.filter(
      (e) =>
        e.category === category &&
        e.summary.toLowerCase().indexOf("patreon") === -1 &&
        (!endpointFilter.value ||
          e.summary
            .toLowerCase()
            .indexOf(endpointFilter.value.toLowerCase()) !== -1)
    );
  }

  async function getDocs() {
    const res = await http.get("/api-docs.json");

    docs.value = res.data;
    paths.value = Object.keys(res.data.paths);
    categories.value = Array.from(
      new Set(paths.value.map((p) => res.data.paths[p].get.tags[0]))
    );
    endpoints.value = paths.value
      .filter((p) => p !== "/games/weather" && p !== "/scoreboard")
      .map((p) => {
        return {
          path: res.data.paths[p],
          category: res.data.paths[p].get.tags[0],
          summary: res.data.paths[p].get.summary,
          key: p,
        };
      });
  }

  function selectEndpoint(event: DropdownChangeEvent) {
    selectedEndpoint.value = JSON.parse(JSON.stringify(event.value));
  }

  return {
    docs,
    getDocs,
    paths,
    categories,
    filteredCategories,
    endpoints,
    endpointFilter,
    selectedEndpoint,
    selectEndpoint,
    getCategoryEndpoints,
  };
});
