<script setup lang="ts">
import { useBlogStore } from "~/stores/blog";

const blogStore = useBlogStore();
await blogStore.getPosts();
</script>

<template>
  <div class="grid">
    <div
      class="col-12 md:col-6 lg:col-4"
      v-for="post in blogStore.posts"
      :key="post.id"
    >
      <Card
        class="blog-card"
        :pt="{
          header: { class: 'flex-initial' },
          body: { class: 'flex-auto' },
          title: { class: 'flex-initial' },
          content: { class: 'flex-auto' },
        }"
      >
        <template #header>
          <img :alt="post.imgAlt" :src="`${post.img}`" />
        </template>
        <template #title>{{ post.title }}</template>
        <template #content>{{ post.excerpt }}</template>
        <template #footer>
          <a :href="post.href" target="_blank">
            <Button>Read more</Button>
          </a>
        </template>
      </Card>
    </div>
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
