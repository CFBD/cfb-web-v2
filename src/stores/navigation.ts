/* eslint-disable @typescript-eslint/ban-ts-comment */
import { computed } from "vue";
import { defineStore } from "pinia";
import { type MenuItem } from "primevue/menuitem";

import { useMainStore } from "./main";

export const useNavigationStore = defineStore("navigation", () => {
  const menuIcon = computed((): string => {
    const mainStore = useMainStore();
    return mainStore.darkMode ? "LetterLogoDark.png" : "LetterLogo.png";
  });

  const menuItems = computed((): MenuItem[] => {
    return [
      {
        label: "Home",
        to: "/",
      },
      {
        label: "Data",
        to: "/exporter",
      },
      {
        label: "Box Scores",
      },
      {
        label: "Charts",
        items: [
          {
            label: "Team Metrics",
            to: "/metrics/season",
          },
          {
            label: "Passing Trends",
            to: "/ppa/passing/cumulative",
          },
          {
            label: "Player Efficiency",
          },
          {
            label: "Historical Matchups",
          },
          {
            label: "Predicted Points",
          },
          {
            label: "SP+",
            items: [
              {
                label: "SP+",
              },
              {
                label: "SP+ Team Trends",
              },
              {
                label: "SP+ and Recruiting",
              },
            ],
          },
        ],
      },
      {
        label: "API",
        items: [
          {
            label: "Docs",
          },
          {
            label: "API Keys",
          },
          {
            separator: true,
            label: "Wrappers",
          },
          {
            label: "Python",
          },
          {
            label: "JavaScript",
          },
          {
            label: "C#",
          },
        ],
      },
      {
        label: "About",
        items: [
          {
            label: "Glossary",
          },
          {
            label: "FAQ & Info",
          },
        ],
      },
    ];
  });

  return { menuIcon, menuItems };
});
