<script setup lang="ts">
// import { onMounted } from "vue";
import { useMainStore } from "@/stores/main";
import { useRouter } from "vue-router";
import BlogGroup from "@/components/BlogGroup.vue";
import Button from "primevue/button";

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
      <BlogGroup />
    </main>
    <div class="col-12 md:col-3 text-center">
      <div class="mt-3">
        <Button icon="pi pi-key" label="API Keys" severity="warning" size="large" class="w-full md:w-8"
          @click="gotoKeys"></Button>
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
