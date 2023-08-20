import { computed, ref } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";
import { useRouter, type RouteLocationNormalized } from "vue-router";

import { useToast } from "primevue/usetoast";

import http from "@/helpers/http";
import { flattenData } from "@/helpers/data";
import type { FieldsetToggleEvent } from "primevue/fieldset";

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
  type: string;
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
  summary: string;
  key: string;
}

export const useApiStore = defineStore("api", () => {
  const router = useRouter();
  const toast = useToast();

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
    if (docs.value || hyrdating.value) {
      return;
    }

    try {
      hyrdating.value = true;
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
    finally {
      hyrdating.value = false;
    }
  }

  function selectPath(path: string) {
    collapseSelections.value = true;
    router.replace(`/exporter${path}`);
  }

  function updatePath(path: string) {
    dataItems.value = [];
    displayFields.value = [];
    selectedEndpoint.value = endpoints.value.find((e) => e.key === path);

    if (selectedEndpoint.value) {
      collapseSelections.value = true;

      for (const qp of selectedEndpoint.value.path.get.parameters) {
        let value = qp.default ?? null;

        if (Object.keys(router.currentRoute.value.query).map(q => q.toLowerCase()).includes(qp.name)) {
          value = router.currentRoute.value.query[qp.name]?.toString() ?? null;
        }

        if (qp.type === "boolean" && value === null) {
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

  function resetParams() {
    collapseSelections.value = false;
    selectedEndpoint.value = null;
    queryParams.value = {};
    dataItems.value = [];
    displayFields.value = [];

    const subpath = router.currentRoute.value.path.replace("/exporter", "");
    if (subpath && subpath !== "") {
      updatePath(subpath);
    }
  }

  function updateParams(to: RouteLocationNormalized) {
    updatePath(`/${to.params.path}`);
  }

  function updateQueryParams() {
    const o = Object.keys(queryParams.value)
      .filter((k) => queryParams.value[k] != null)
      .reduce((a, k) => ({ ...a, [k]: queryParams.value[k] }), {});

    router.push({ path: router.currentRoute.value.path, query: o });
  }

  function query() {
    if (selectedEndpoint.value) {
      loadingData.value = true;
      updateQueryParams();

      http.get(selectedEndpoint.value?.key, {
        params: queryParams.value
      }).then((res) => {
        dataItems.value = flattenData(selectedEndpoint.value?.key, res.data);
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
    resetParams,
    updateParams,
    query,
    toggleColumn
  };
});
