import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import store from "../store"

import { getFieldById } from "../utils/functions/getFieldById"

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/RegisterView.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/explore",
    name: "Explore",
    component: () => import("../views/ExploreMapView.vue")
  },
  {
    path: "/drawmap",
    name: "DrawMap",
    component: () => import("../views/DrawMapView.vue"),
    meta: {
      requiresLogin: true
    }
  },
  {
    path: "/grid/:gridId",
    name: "Grid",
    component: () => import("../views/grid/_id/index.vue")
  },
  {
    path: "/user/:userId",
    name: "User",
    component: () => import("../views/user/_id/index.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/user/:userId/:fieldId",
    name: "Field",
    component: () => import("../views/field/_id/index.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/testing",
    name: "Testing",
    component: () => import("../views/TestView.vue")
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("../views/errors/notFound.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  let requiresLogin = false
  let requiresAuth = false
  to.matched.some((record) => {
    if (record.meta.requiresLogin) {
      requiresLogin = true
    } else if (record.meta.requiresAuth) {
      requiresAuth = true
    }
  })

  if (requiresLogin) {
    if (store.getters.isLoggedIn) {
      next()
    } else {
      next("/login")
    }
  } else if (requiresAuth) {
    if (store.getters.getUser.id != to.params.userId) {
      next("login")
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
