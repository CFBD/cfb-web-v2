import { computed } from 'vue';
import { defineStore } from 'pinia';
import { type MenuItem } from 'primevue/menuitem';

import { useMainStore } from './main';

export const useNavigationStore = defineStore('navigation', () => {
  const menuIcon = computed((): string => {
    const mainStore = useMainStore();
    return mainStore.darkMode
      ? 'https://cdn.collegefootballdata.com/logos/LetterLogoDark.png'
      : 'https://cdn.collegefootballdata.com/logos/LetterLogo.png';
  });

  const menuItems = computed((): MenuItem[] => {
    return [
      {
        label: 'Home',
        icon: 'pi pi-home',
        route: '/',
      },
      {
        label: 'Analytics',
        icon: 'pi pi-chart-line',
        items: [
          {
            label: 'Data Exporter',
            icon: 'pi pi-download',
            route: '/exporter',
          },
          {
            separator: true,
            label: 'Visualizations',
          },
          {
            label: 'Win Probability',
            icon: 'pi pi-chart-bar',
            route: '/wp',
          },
          {
            label: 'Team Metrics',
            icon: 'pi pi-objects-column',
            route: '/metrics/season',
          },
          {
            label: 'Player Efficiency',
            icon: 'pi pi-user',
            route: '/ppa/usage',
          },
          {
            label: 'Passing Trends',
            icon: 'pi pi-arrow-up-right',
            route: '/ppa/passing/cumulative',
          },
          {
            label: 'SP+ Team Trends',
            icon: 'pi pi-trending-up',
            route: '/sp/trends',
          },
          {
            label: 'Predicted Points',
            icon: 'pi pi-calculator',
            route: '/predictedpoints',
          },
        ],
      },
      {
        label: 'Teams & Games',
        icon: 'pi pi-flag',
        items: [
          {
            label: 'Teams',
            icon: 'pi pi-users',
            route: '/teams',
          },
          {
            label: 'Box Scores',
            icon: 'pi pi-list',
            route: '/boxscore',
          },
          {
            label: 'Head-to-Head Matchups',
            icon: 'pi pi-arrows-h',
            route: '/matchup',
          },
        ],
      },
      {
        label: 'API & Tools',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Get API Key',
            icon: 'pi pi-key',
            route: '/key',
          },
          {
            label: 'Access Tiers',
            icon: 'pi pi-star',
            route: '/api-tiers',
          },
          {
            separator: true,
            label: 'Documentation',
          },
          {
            label: 'REST API Docs',
            icon: 'pi pi-book',
            url: 'https://apinext.collegefootballdata.com',
            target: '_blank',
          },
          {
            label: 'GraphQL Playground',
            icon: 'pi pi-code',
            url: 'https://graphqldocs.collegefootballdata.com',
            target: '_blank',
          },
          {
            separator: true,
            label: 'Code Libraries',
          },
          {
            label: 'Python Library',
            icon: 'pi pi-github',
            url: 'https://github.com/CFBD/cfbd-python',
            target: '_blank',
          },
          {
            label: 'TypeScript Library',
            icon: 'pi pi-github',
            url: 'https://www.npmjs.com/package/cfbd',
            target: '_blank',
          },
          {
            label: 'C# Library',
            icon: 'pi pi-github',
            url: 'https://github.com/CFBD/cfbd-net',
            target: '_blank',
          },
        ],
      },
      {
        label: 'Basketball',
        icon: 'pi pi-circle',
        items: [
          {
            label: 'Basketball Site',
            icon: 'pi pi-external-link',
            url: 'https://collegebasketballdata.com',
            target: '_blank',
          },
          {
            label: 'Basketball API',
            icon: 'pi pi-code',
            url: 'https://api.collegebasketballdata.com',
            target: '_blank',
          },
          {
            separator: true,
            label: 'Libraries',
          },
          {
            label: 'Python Library',
            icon: 'pi pi-github',
            url: 'https://github.com/CFBD/cbbd-python',
            target: '_blank',
          },
          {
            label: 'TypeScript Library',
            icon: 'pi pi-github',
            url: 'https://github.com/CFBD/cbbd-typescript',
            target: '_blank',
          },
        ],
      },
      {
        label: 'Help',
        icon: 'pi pi-question-circle',
        items: [
          {
            label: 'Glossary',
            icon: 'pi pi-book',
            route: '/glossary',
          },
          {
            label: 'FAQ & Info',
            icon: 'pi pi-info-circle',
            route: '/about',
          },
          {
            label: 'Terms & Conditions',
            icon: 'pi pi-file-text',
            route: '/terms',
          },
        ],
      },
    ];
  });

  return { menuIcon, menuItems };
});
