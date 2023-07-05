import { ref } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";

import GhostContentAPI, { type PostsOrPages } from "@tryghost/content-api";

export interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  href: string;
  img: string;
  imgAlt: string;
}

export const useBlogStore = defineStore("blog", () => {
  const posts: Ref<BlogPostData[]> = ref([]);

  async function getPosts() {
    const api = new GhostContentAPI({
      url: "https://blog.collegefootballdata.com",
      key: "3d654ae56e824a1b9001763e9e",
      version: "v2",
    });

    api.posts
      .browse({
        limit: 6,
        include: "tags",
      })
      .then((blogPosts: PostsOrPages) => {
        posts.value = blogPosts.map((bp) => ({
          id: bp.id,
          title: bp.title ?? "",
          excerpt: bp.excerpt ?? "",
          href: bp.url ?? "",
          img: bp.feature_image ?? "",
          imgAlt: bp.feature_image_alt ?? "",
        }));
      });
  }

  return { posts, getPosts };
});
