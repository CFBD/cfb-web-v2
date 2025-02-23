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
        route: "/",
      },
      {
        label: "Data",
        route: "/exporter",
      },
      {
        label: "Teams",
        route: "/teams"
      },
      {
        label: "Box Scores",
        route: "/boxscore",
      },
      {
        label: "Charts",
        items: [
          {
            label: "Win Probability",
            route: "/wp"
          },
          {
            label: "Team Metrics",
            route: "/metrics/season",
          },
          {
            label: "Passing Trends",
            route: "/ppa/passing/cumulative",
          },
          {
            label: "Player Efficiency",
            route: "/ppa/usage"
          },
          {
            label: "Historical Matchups",
            route: "/matchup"
          },
          {
            label: "Predicted Points",
            route: "/predictedpoints"
          },
          {
            label: "SP+ Team Trends",
            route: "/sp/trends"
          },
        ],
      },
      {
        label: "API",
        items: [
          {
            label: "Docs",
            url: "https://apinext.collegefootballdata.com",
            target: "_blank"
          },
          {
            label: "API Keys",
            route: "/key"
          },
          {
            separator: true,
            label: "Wrappers",
          },
          {
            label: "Python",
            url: "https://github.com/CFBD/cfbd-python",
            target: "_blank"
          },
          {
            label: "JavaScript",
            url: "https://www.npmjs.com/package/cfbd",
            target: "_blank"
          },
          {
            label: "C#",
            url: "https://github.com/CFBD/cfbd-net",
            target: "_blank"
          }
        ],
      },
      {
        label: "GraphQL",
        url: "https://graphqldocs.collegefootballdata.com",
        target: "_blank",
      },
      {
        label: "Basketball",
        items: [
          {
            label: "Site",
            url: "https://collegebasketballdata.com",
            target: "_blank",
          },
          {
            label: "API",
            url: "https://api.collegebasketballdata.com",
            target: "_blank",
          },
          {
            label: "Python",
            url: "https://github.com/CFBD/cbbd-python",
            target: "_blank",
          },
          {
            label: "TypeScript",
            url: "https://github.com/CFBD/cbbd-typescript",
            target: "_blank",
          }
        ]
      },
      {
        label: "About",
        items: [
          {
            label: "Glossary",
            route: "/glossary"
          },
          {
            label: "FAQ & Info",
            route: "/about"
          },
        ],
      },
    ];
  });

  return { menuIcon, menuItems };
});
