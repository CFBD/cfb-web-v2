<script setup lang="ts">
// import { onMounted } from "vue";
import { useMainStore } from "@/stores/main";
import BlogGroup from "@/components/BlogGroup.vue";
import Button from "primevue/button";

const mainStore = useMainStore();

// onMounted(() => {
//   let twitterScript = document.createElement("script");
//   twitterScript.setAttribute("src", "https://platform.twitter.com/widgets.js");
//   document.head.appendChild(twitterScript);
// });
</script>

<template>
  <div class="grid mt-3 ml-3">
    <main class="col-9">
      <BlogGroup />
    </main>
    <div class="col-3 text-center">
      <div class="mt-3">
        <a href="https://www.patreon.com/bePatron?u=23067681" target="_blank">
          <Button
            icon="pi pi-patreon"
            label="Become a Patron!"
            severity="danger"
          ></Button>
        </a>
      </div>
      <div class="mt-3">
        <a href="https://twitter.com/cfb_data" target="_blank">
          <Button
            icon="pi pi-twitter"
            label="Follow me on Twitter"
            severity="primary"
          ></Button>
        </a>
        <!-- <a
          class="twitter-timeline"
          :data-theme="mainStore.darkMode ? 'dark' : 'light'"
          href="https://twitter.com/CFB_Data?ref_src=twsrc%5Etfw"
          >Tweets by CFB_Data</a
        > -->
      </div>
      <div class="mt-3">
        <iframe
          :src="`https://discord.com/widget?id=578652864793018368&theme=${
            mainStore.darkMode ? 'dark' : 'light'
          }`"
          width="350"
          height="500"
          allowtransparency="true"
          frameborder="0"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        ></iframe>
      </div>
    </div>
  </div>
</template>
