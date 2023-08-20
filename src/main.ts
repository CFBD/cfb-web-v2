import "./assets/main.css";
import "primevue/resources/primevue.min.css";
import "primeflex/primeflex.min.css";
import "primeicons/primeicons.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";
import ToastService from "primevue/toastservice";

import VueGtag from "vue-gtag";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(PrimeVue, { ripple: true });
app.use(router);

app.use(VueGtag, {
  config: {
    id: "G-BPYY3G7LL2",
  }
}, router);

app.use(ToastService);

app.directive("tooltip", Tooltip);

app.config.globalProperties.$filters = {
  capitalize(value: string) {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
  },
  titlecase(value: string) {
    return value
      .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
      .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase());
  },
};

app.mount("#app");
