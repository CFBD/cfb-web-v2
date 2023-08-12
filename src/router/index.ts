import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ExportView from "../views/ExportView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/exporter/:path([\\w\\/]+)?",
      name: "exporter",
      component: ExportView,
      props: true,
    },
    {
      path: "/metrics/season",
      name: "seasonMetrics",
      component: () => import("../views/TeamMetricsView.vue"),
    },
    {
      path: '/ppa/passing/cumulative',
      name: 'passingTrends',
      component: () => import("../views/PassingTrendsView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
