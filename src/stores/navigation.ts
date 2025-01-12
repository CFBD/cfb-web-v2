/* eslint-disable @typescript-eslint/ban-ts-comment */
import { computed } from "vue";
import { defineStore } from "pinia";
import { type MenuItem } from "primevue/menuitem";

import { useMainStore } from "./main";

export const useNavigationStore = defineStore("navigation", () => {
  const menuIcon = computed((): string => {
    const mainStore = useMainStore();
    return mainStore.darkMode ? "https://cdn.collegefootballdata.com/logos/LetterLogoDark.png" : "https://cdn.collegefootballdata.com/logos/LetterLogo.png";
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
        label: "Teams",
        to: "/teams"
      },
      {
        label: "Box Scores",
        to: "/boxscore",
      },
      {
        label: "Charts",
        items: [
          {
            label: "Win Probability",
            to: "/wp"
          },
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
            to: "/ppa/usage"
          },
          {
            label: "Historical Matchups",
            to: "/matchup"
          },
          {
            label: "Predicted Points",
            to: "/predictedpoints"
          },
          {
            label: "SP+ Team Trends",
            to: "/sp/trends"
          },
        ],
      },
      {
        label: "API",
        items: [
          {
            label: "Docs",
            url: "https://api.collegefootballdata.com",
            target: "_blank"
          },
          {
            label: "API Keys",
            to: "/key"
          },
          {
            separator: true,
            label: "Wrappers",
          },
          {
            label: "Python",
            url: "https://pypi.org/project/cfbd/",
            target: "_blank"
          },
          {
            label: "JavaScript",
            url: "https://www.npmjs.com/package/cfb.js",
            target: "_blank"
          },
          {
            label: "C#",
            url: "https://www.nuget.org/packages/CFBSharp/",
            target: "_blank"
          },
        ],
      },
      {
        label: "API v2",
        items: [
          {
            label: "Docs",
            url: "https://apinext.collegefootballdata.com",
            target: "_blank"
          },
          {
            label: "API Keys",
            to: "/key"
          },
          {
            separator: true,
            label: "Wrappers",
          },
          {
            label: "Python",
            url: "https://github.com/CFBD/cfbd-python/tree/next",
            target: "_blank"
          },
          {
            label: "JavaScript",
            url: "https://www.npmjs.com/package/cfbd",
            target: "_blank"
          },
        ],
      },
      {
        label: "GraphQL",
        url: "https://graphqldocs.collegefootballdata.com",
        target: "_blank",
      },
      {
        label: "About",
        items: [
          {
            label: "Glossary",
            to: "/glossary"
          },
          {
            label: "FAQ & Info",
            to: "/about"
          },
        ],
      },
    ];
  });

  return { menuIcon, menuItems };
});
