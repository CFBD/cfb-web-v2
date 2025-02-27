import { computed, ref } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";

import { useToast } from "primevue/usetoast";

import type { FieldsetToggleEvent } from "primevue/fieldset";
import { flattenData } from "~/utils/data";
import type { LocationQuery, LocationQueryValue, RouteLocationNormalizedLoadedGeneric } from "vue-router";

interface ResultField {
  item: string;
  name: string;
}

interface QueryParameters {
  [key: string]: string | boolean | number | null
}

interface Parameter {
  description: string;
  in: string;
  name: string;
  schema: {
    type: string;
  };
  required: boolean;
  currentValue?: string;
  default?: string | boolean | number;
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
  description: string;
  key: string;
}

export const useApiStore = defineStore("api", () => {
  const config = useRuntimeConfig();
  const toast = useToast();

  let currentRoute: RouteLocationNormalizedLoadedGeneric | null = null;
  let router = useRouter();

  const hyrdating = ref(false);
  const docs = ref();
  const paths: Ref<string[]> = ref([]);
  const categories: Ref<string[]> = ref([]);
  const endpoints: Ref<Endpoint[]> = ref([]);
  const selectedEndpoint: Ref<Endpoint | null | undefined> = ref(null);
  const endpointFilter = ref("");
  const collapseSelections = ref(false);
  const loadingData = ref(false);

  const dataItems = ref([]);

  const queryParams: Ref<QueryParameters> = ref({});

  const showEndpointForm = computed(() => selectedEndpoint.value ? true : false);
  const showDataTable = computed(() => loadingData.value || (dataItems.value && dataItems.value.length));
  const allFields: Ref<ResultField[]> = computed(() => {
    if (dataItems.value && dataItems.value.length) {
      return Object.keys(dataItems.value[0]).map(k => ({
        item: k,
        name: k.replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()).replace(/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase())
      }));
    } else {
      return [];
    }
  });

  const displayFields: Ref<ResultField[]> = ref([]);

  const filteredCategories = computed(() =>
    categories.value.filter((c) => getCategoryEndpoints(c).length > 0).sort((a: string, b: string) => a.localeCompare(b))
  );

  function getCategoryEndpoints(category: string): Endpoint[] {
    return endpoints.value.filter(
      (e) =>
        e.category === category &&
        e.description?.toLowerCase().indexOf("patreon") === -1 &&
        (!endpointFilter.value ||
          e.description
            .toLowerCase()
            .indexOf(endpointFilter.value.toLowerCase()) !== -1)
    );
  }

  async function getDocs() {
    if (docs.value || hyrdating.value) {
      return;
    }

    try {
      hyrdating.value = true;
      const res = await $fetch<any>("/api-docs.json", {
        method: "GET",
        baseURL: config.public.apiBaseUrl,
      });

      docs.value = res;
      paths.value = Object.keys(res.paths);
      categories.value = Array.from(
        new Set(paths.value.map((p) => res.paths[p].get.tags[0]).filter((c) => c !== "AdjustedMetrics"))
      );
      endpoints.value = paths.value
        .filter((p) => p !== "/games/weather" && p !== "/scoreboard" && p !== "/live/plays" && p.indexOf("/wepa/") === -1)
        .map((p) => {
          return {
            path: res.paths[p],
            category: res.paths[p].get.tags[0],
            description: res.paths[p].get.description,
            key: p,
          };
        });
    }
    finally {
      hyrdating.value = false;
    }
  }

  function selectPath(path: string) {
    collapseSelections.value = true;
    // router.replace(`/exporter${path}`);
  }

  function updatePath(path: string, query: LocationQuery) {
    dataItems.value = [];
    displayFields.value = [];
    selectedEndpoint.value = endpoints.value.find((e) => e.key === `/${path}`);

    if (selectedEndpoint.value) {
      queryParams.value = {};
      collapseSelections.value = true;

      for (const qp of selectedEndpoint.value.path.get.parameters) {
        let value = qp.default ?? null;

        if (Object.keys(query).map(q => q.toLowerCase()).includes(qp.name)) {
          value = query[qp.name]?.toString() ?? null;
        }

        if (qp.schema.type === "boolean" && value === null) {
          value = false;
        }

        if (!queryParams.value[qp.name]) {
          queryParams.value[qp.name] = value;
        }
      }
    }
  }

  function toggleCategories(evt: FieldsetToggleEvent) {
    collapseSelections.value = evt.value;
  }

  function updateParams(route: RouteLocationNormalizedLoadedGeneric) {
    currentRoute = route;
    updatePath(
      Array.isArray(currentRoute.params.endpoint) ? currentRoute.params.endpoint.join("/") : currentRoute.params.endpoint,
      currentRoute.query,
    );
  }

  function updateQueryParams() {
    const o = Object.keys(queryParams.value)
      .filter((k) => queryParams.value[k] != null)
      .reduce((a, k) => ({ ...a, [k]: queryParams.value[k] }), {});

      if (currentRoute) {
        for (let key of Object.keys(queryParams.value)) {
          if (queryParams.value[key]) {
            currentRoute.query[key] = queryParams.value[key] as LocationQueryValue;
          }
        }
      }

      router.replace({ query: currentRoute?.query });
  }

  function query() {
    if (selectedEndpoint.value) {
      loadingData.value = true;
      updateQueryParams();

      $fetch<any>(selectedEndpoint.value?.key, {
        method: "GET",
        baseURL: config.public.apiBaseUrl,
        params: currentRoute?.query,
      }).then((res) => {
        dataItems.value = flattenData(selectedEndpoint.value?.key, res);
        displayFields.value = allFields.value;
        loadingData.value = false;

        if (!dataItems.value || dataItems.value.length === 0) {
          toast.add({ severity: "info", summary: "No data returned", detail: "Try specifying different filter values and resubmitting.", life: 3000 })
        }
      }).catch(() => {
        toast.add({ severity: "warn", summary: "Invalid query", detail: "Try adding more filter values and resubmitting.", life: 3000 })
      }).finally(() => {
        loadingData.value = false;
      })
    }
  }

  function toggleColumn(values: ResultField[]) {
    const items = values.map(v => v.item);
    displayFields.value = allFields.value.filter(col => items.includes(col.item));
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
    showEndpointForm,
    showDataTable,
    queryParams,
    allFields,
    displayFields,
    dataItems,
    loadingData,
    getCategoryEndpoints,
    collapseSelections,
    toggleCategories,
    selectPath,
    updatePath,
    updateParams,
    query,
    toggleColumn
  };
});
