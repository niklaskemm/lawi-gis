import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("../views/Contact.vue")
  },
  {
    path: "/testing",
    name: "Testing",
    component: () => import("../views/Testing.vue")
  },
  {
    path: "/grid/:gridId",
    name: "Grid",
    component: () => import("../views/grid/_id/index.vue")
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("../views/errors/notFound.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
