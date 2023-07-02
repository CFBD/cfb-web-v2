/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ref } from "vue";
import { defineStore } from "pinia";
import { usePrimeVue } from "primevue/config";

export const useMainStore = defineStore("main", () => {
  const PrimeVue = usePrimeVue();

  const darkMode = ref(localStorage.getItem("isDarkMode") == "true");
  if (!darkMode.value) {
    // @ts-ignore
    PrimeVue.changeTheme(
      "bootstrap4-dark-blue",
      "bootstrap4-light-blue",
      "theme-link",
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {}
    );
  }

  const toggleDarkMode = () => {
    localStorage.setItem("isDarkMode", String(!darkMode.value));
    darkMode.value = !darkMode.value;
    // @ts-ignore
    PrimeVue.changeTheme(
      `bootstrap4-${darkMode.value ? "light" : "dark"}-blue`,
      `bootstrap4-${darkMode.value ? "dark" : "light"}-blue`,
      "theme-link",
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {}
    );
  };

  return { darkMode, toggleDarkMode };
});
