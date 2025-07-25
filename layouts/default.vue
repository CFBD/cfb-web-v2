<script setup lang="ts">
import { useMainStore } from '~/stores/main';

const currentYear = new Date().getFullYear();

const mainStore = useMainStore();
await mainStore.hyrdate();

useHead({
  link: [
    {
      rel: 'icon',
      href: 'https://cdn.collegefootballdata.com/favicon.ico',
    },
  ],
  script: [
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-BPYY3G7LL2',
      async: true,
    },
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-BPYY3G7LL2');
      `,
    },
    {
      src: '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
      async: true,
    },
    {
      innerHTML: `
        (adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: "ca-pub-3674605305984905",
          enable_page_level_ads: true
        });
      `,
    },
  ],
});
</script>

<template>
  <Navigation />
  <slot />
  <footer class="text-center p-2">
    <hr />
    Copyright &copy; {{ currentYear }} CollegeFootballData.com
  </footer>
</template>
