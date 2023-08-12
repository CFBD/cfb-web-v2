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

  const yearRanges = ref([2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]);
  const defaultYear = ref(2022);

  const fbsConferences = ref([
    {
      value: "All",
      text: "All"
    },
    {
      value: "ACC",
      text: "ACC"
    },
    {
      value: "AAC",
      text: "American Athletic"
    },
    {
      value: "B12",
      text: "Big 12"
    },
    {
      value: "B1G",
      text: "Big Ten"
    },
    {
      value: "CUSA",
      text: "Conference USA"
    },
    {
      value: "Ind",
      text: "FBS Independents"
    },
    {
      value: "MAC",
      text: "Mid-American"
    },
    {
      value: "Mountain West",
      text: "MWC"
    },
    {
      value: "PAC",
      text: "Pac-12"
    },
    {
      value: "SEC",
      text: "SEC"
    },
    {
      value: "SBC",
      text: "Sun Belt"
    }
  ]);

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
      () => { }
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
      () => { }
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
    yearRanges,
    defaultYear,
    fbsConferences
  };
});
