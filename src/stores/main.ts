/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ref } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";
import { usePrimeVue } from "primevue/config";

import http from "@/helpers/http";

interface Team {
  id: number;
  school: string;
  mascot: string;
  abbreviation: string;
  classification: string;
  conference: string;
  division: string;
  color: string;
  alt_color: string;
}

interface Conference {
  id: number;
  name: string;
  short_name: string;
  abbreviation: string;
  classification: string;
}

interface PlayType {
  id: number;
  text: string;
  abbreviation: string;
}

interface PlayStatType {
  id: number;
  name: string;
}

export const useMainStore = defineStore("main", () => {
  const isHydrating = ref(false);

  const teams: Ref<Team[]> = ref([]);
  const conferences: Ref<Conference[]> = ref([]);
  const playTypes: Ref<PlayType[]> = ref([]);
  const playStatTypes: Ref<PlayStatType[]> = ref([]);

  async function getTeams() {
    const res = await http.get("/teams");
    teams.value = res.data;
  }

  async function getConferences() {
    const res = await http.get("/conferences");
    conferences.value = res.data;
  }

  async function getPlayTypes() {
    const res = await http.get("/play/types");
    playTypes.value = res.data;
  }

  async function getPlayStatTypes() {
    const res = await http.get("/play/stat/types");
    playStatTypes.value = res.data;
  }

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

  async function hyrdate() {
    if (!isHydrating.value) {
      isHydrating.value = true;
      await Promise.all([
        getTeams(),
        getConferences(),
        getPlayTypes(),
        getPlayStatTypes(),
      ]);
      isHydrating.value = false;
    }
  }

  return {
    isHydrating,
    hyrdate,
    darkMode,
    toggleDarkMode,
    teams,
    conferences,
    playTypes,
    playStatTypes,
  };
});
