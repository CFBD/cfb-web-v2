<script setup lang="ts">
// import { onMounted } from "vue";
import { useMainStore } from "@/stores/main";
import { useRouter } from "vue-router";
import BlogGroup from "@/components/BlogGroup.vue";
import Button from "primevue/button";
import Message from "primevue/message";

const mainStore = useMainStore();
const router = useRouter();

const gotoKeys = () => {
  router.push("/key");
}

// onMounted(() => {
//   let twitterScript = document.createElement("script");
//   twitterScript.setAttribute("src", "https://platform.twitter.com/widgets.js");
//   document.head.appendChild(twitterScript);
// });
</script>

<template>
  <div class="grid home-content mt-3 pl-3">
    <main class="col-12 md:col-9">
      <Message severity="warn" :closable="false">
        CFBD API V2 is now available in a limited beta for Patreon subscribers.
        CFBD API V1 will be sunset prior to the 2025 season.
        <a href="https://www.patreon.com/posts/110346912">Click here for more details.</a>
      </Message>
      <BlogGroup />
    </main>
    <div class="col-12 md:col-3 text-center">
      <div class="mt-3">
        <Button icon="pi pi-key" label="API Keys" severity="warning" size="large" class="w-full md:w-8"
          @click="gotoKeys"></Button>
      </div>
      <div class="mt-3">
        <a href="https://insomnia.rest/run/?label=CFBD&uri=https%3A%2F%2Fapi.collegefootballdata.com%2Fapi-docs.json"
          target="_blank">
          <Button label="Run in Insomnia!" class="w-full md:w-8 insomnia-button">
            <template #icon>
              <svg width="16px" height="16px" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
                <defs>
                  <linearGradient x1="49.9998025%" y1="100%" x2="49.9998025%" y2="0%" id="linearGradient-1">
                    <stop stop-color="#7400E1" offset="0%"></stop>
                    <stop stop-color="#4000BF" offset="100%"></stop>
                  </linearGradient>
                </defs>
                <g>
                  <path
                    d="M128,249.4912 C195.0984,249.4912 249.492,195.0976 249.492,128 C249.492,60.90208 195.0984,6.508472 128,6.508472 C60.9024,6.508472 6.508792,60.90208 6.508792,128 C6.508792,195.0976 60.9024,249.4912 128,249.4912 Z"
                    fill="#FFFFFF" fill-rule="nonzero"></path>
                  <path
                    d="M128,0 C57.30752,0 0,57.30752 0,128 C0,198.6928 57.30752,256 128,256 C198.6928,256 256,198.6928 256,128 C256,57.30752 198.6928,0 128,0 Z M128,13.01696 C191.5032,13.01696 242.9832,64.49664 242.9832,128 C242.9832,191.5032 191.5032,242.9832 128,242.9832 C64.49664,242.9832 13.01696,191.5032 13.01696,128 C13.01696,64.49664 64.49664,13.01696 128,13.01696 Z"
                    fill="#4000BF" fill-rule="nonzero"></path>
                  <path
                    d="M129.4456,36.88136 C179.7696,36.88136 220.5648,77.67656 220.5648,128 C220.5648,178.3232 179.7696,219.1184 129.4456,219.1184 C79.12232,219.1184 38.32712,178.3232 38.32712,128 C38.32712,115.7016 40.76376,103.972 45.18064,93.2672 C51.62984,102.0496 62.03016,107.7512 73.76216,107.7512 C93.3328,107.7512 109.1968,91.8864 109.1968,72.3164 C109.1968,60.5844 103.496,50.18408 94.7128,43.73496 C105.4176,39.318 117.1472,36.88136 129.4456,36.88136 Z"
                    fill="url(#linearGradient-1)"></path>
                </g>
              </svg>
            </template>
          </Button>
        </a>
      </div>
      <div class="mt-3">
        <a href="https://www.patreon.com/bePatron?u=23067681" target="_blank">
          <Button label="Become a Patron!" severity="danger" class="w-full md:w-8">
            <template #icon>
              <svg class="mr-2" height="15px" width="15px" viewBox="0 -4.5 256 256" version="1.1"
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                preserveAspectRatio="xMidYMid">
                <g>
                  <path
                    d="M45.1355837,0 L45.1355837,246.35001 L0,246.35001 L0,0 L45.1355837,0 Z M163.657111,0 C214.65668,0 256,41.3433196 256,92.3428889 C256,143.342458 214.65668,184.685778 163.657111,184.685778 C112.657542,184.685778 71.3142222,143.342458 71.3142222,92.3428889 C71.3142222,41.3433196 112.657542,0 163.657111,0 Z">
                  </path>
                </g>
              </svg>
            </template>
          </Button>
        </a>
      </div>
      <div class="mt-3">
        <a href="https://twitter.com/cfb_data" target="_blank">
          <Button icon="pi pi-twitter" label="Follow me on Twitter" severity="primary" class="w-full md:w-8"></Button>
        </a>
        <!-- <a
          class="twitter-timeline"
          :data-theme="mainStore.darkMode ? 'dark' : 'light'"
          href="https://twitter.com/CFB_Data?ref_src=twsrc%5Etfw"
          >Tweets by CFB_Data</a
        > -->
      </div>
      <div class="mt-3">
        <iframe :src="`https://discord.com/widget?id=578652864793018368&theme=${mainStore.darkMode ? 'dark' : 'light'
          }`" width="300" height="500" allowtransparency="true" frameborder="0"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-content {
  width: 100%;
}
</style>
