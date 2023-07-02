<template>
  <div class="grid">
    <div
      class="col-12 md:col-6 lg:col-4"
      v-for="post in blogStore.posts"
      :key="post.id"
    >
      <Card>
        <template #header>
          <img :alt="post.imgAlt" :src="`${post.img}`" />
        </template>
        <template #title>{{ post.title }}</template>
        <template #content>{{ post.excerpt }}</template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useBlogStore } from "@/stores/blog";
import Card from "primevue/card";

const blogStore = useBlogStore();
onMounted(blogStore.getPosts);
</script>

<style lang="scss" scoped>
.p-card-header {
  img {
    width: 100%;
  }
}
</style>
