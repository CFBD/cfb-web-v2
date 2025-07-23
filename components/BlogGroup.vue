<script setup lang="ts">
import { useBlogStore } from "~/stores/blog";

const blogStore = useBlogStore();
await blogStore.getPosts();
</script>

<template>
      <div
        v-for="post in blogStore.posts"
        :key="post.id"
        class="mt-2"
      >
        <div>{{ post.title }}<br /><a :href="post.href" target="_blank" :style="{ textDecoration: 'none' }">Read more...</a></div>
        <Divider />
      </div>
</template>

<style lang="scss">
.blog-card {
  display: flex;
  flex-flow: column;
  height: 100%;

  .p-card-body {
    display: flex;
    flex-flow: column;
  }

  .p-card-header {
    img {
      width: 100%;
    }
  }
}
</style>
