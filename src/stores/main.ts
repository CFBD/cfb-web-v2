import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { PrimeIcons } from 'primevue/api'
import { usePrimeVue } from 'primevue/config'
import { type MenuItem } from 'primevue/menuitem'

export const useMainStore = defineStore('main', () => {
const PrimeVue = usePrimeVue();

  const loggedIn = ref(true);
  const roles = ref([]);

  const menuItems = computed((): MenuItem[] => {
    if (!loggedIn) {
        return [{
            label: "Sign In",
            icon: PrimeIcons.SIGN_IN
        }];
    } else {
        return [{
            label: "Home",
            icon: PrimeIcons.HOME
        }, {
            label: "Sign Out",
            icon: PrimeIcons.SIGN_OUT
        }];
    }
  });

  let darkMode = ref(localStorage.getItem("isDarkMode") == "true");
  if (!darkMode.value) {
    PrimeVue.changeTheme('bootstrap4-dark-blue', 'bootstrap4-light-blue', 'theme-link', () => {});
  }

  const toggleDarkMode = () => {
    localStorage.setItem("isDarkMode", String(!darkMode.value));
    darkMode.value = !darkMode.value;
    PrimeVue.changeTheme(`bootstrap4-${darkMode.value ? 'light' : 'dark'}-blue`, `bootstrap4-${darkMode.value ? 'dark' : 'light'}-blue`, 'theme-link', () => {});
  }

  return { loggedIn, roles, darkMode, menuItems, toggleDarkMode };
})
