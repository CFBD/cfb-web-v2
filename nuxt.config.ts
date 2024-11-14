import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  $production: {
    runtimeConfig: {
      public: {
        apiBaseUrl: 'https://api.collegefootballdata.com',
      },
    },
  },
  $development: {
    runtimeConfig: {
      public: {
        apiBaseUrl: 'http://localhost:3031',
      },
    },
  },
  app: {
    head: {
      title: 'CollegeFootballData.com',
    },
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  modules: ['@primevue/nuxt-module', '@pinia/nuxt'],
  css: ['primeflex/primeflex.css', 'primeicons/primeicons.css'],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark-mode',
        },
      },
    },
  },
});
