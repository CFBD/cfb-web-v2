/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { usePrimeVue } from "primevue/config";
import { type MenuItem } from "primevue/menuitem";

export const useMainStore = defineStore("main", () => {
  const PrimeVue = usePrimeVue();

  const loggedIn = ref(true);
  const roles = ref([]);

  const menuItems = computed((): MenuItem[] => {
    if (!loggedIn.value) {
      return [
        {
          label: "Home",
        },
        {
          label: "Leaderboard",
        },
        {
          label: "About",
        },
      ];
    } else {
      return [
        {
          label: "Home",
        },
        {
          label: "History",
        },
        {
          label: "Leaderboard",
        },
        {
          label: "About",
        },
      ];
    }
  });

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

  return { loggedIn, roles, darkMode, menuItems, toggleDarkMode };
});
