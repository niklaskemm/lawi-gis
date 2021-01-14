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
    path: "/clickmap",
    name: "ClickMap",
    component: () => import("../views/ClickMapView.vue")
  },
  {
    path: "/drawmap",
    name: "DrawMap",
    component: () => import("../views/DrawMapView.vue")
  },
  {
    path: "/testing",
    name: "Testing",
    component: () => import("../views/TestMapView.vue")
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
