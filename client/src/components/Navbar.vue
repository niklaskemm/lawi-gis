<template>
  <nav class="navbar">
    <ul class="navbar__list">
      <li class="navbar__item">
        <router-link class="navbar__link" to="/">
          <div class="logo">LaWiGIS</div>
        </router-link>
      </li>
      <li v-if="store.getters.getToken" class="navbar__item">
        <router-link class="navbar__link" to="/explore">Explore</router-link>
      </li>
      <li v-if="store.getters.getToken" class="navbar__item">
        <router-link class="navbar__link" to="/about">About</router-link>
      </li>
      <li v-if="!store.getters.getToken" class="navbar__item">
        <router-link class="navbar__link" to="/login">Login</router-link>
      </li>
      <li v-if="!store.getters.getToken" class="navbar__item">
        <router-link class="navbar__link" to="/register">Register</router-link>
      </li>
      <li v-if="store.getters.getToken" class="navbar__item">
        <router-link class="navbar__link" :to="{path: `/user/${user.id}`}">{{user.firstname}}</router-link>
      </li>
      <li v-if="store.getters.getToken" class="navbar__item">
        <router-link @click="logout" class="navbar__link" to="/">Logout</router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  onUpdated,
  watchEffect
} from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"

export default defineComponent({
  name: "Navbar",
  components: {},

  setup() {
    const store = useStore()
    const router = useRouter()

    function logout() {
      store.commit("setUser", null)
      store.commit("setToken", null)
    }

    const user = computed(() => store.getters.getUser)

    return { store, router, logout, user }
  }
})
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap");
.navbar {
  position: sticky;
  z-index: 10;
  background: white;
  top: 0;
  left: 0;
  width: 100%;

  & .navbar__list {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    & .navbar__item {
      list-style: none;

      & .navbar__link {
        font-weight: lighter;
        color: #2c3e50;
        text-decoration: none;

        // & .logo {
        //   font-family: Bungee Shade;
        //   font-style: normal;
        //   font-weight: normal;
        //   font-size: 32px;
        //   height: 32px;
        // }
      }
    }
  }
}

// @media (min-width: 1000px) {
//   .navbar {
//     position: sticky;
//     bottom: unset;
//     top: 0;
//   }
// }
</style>
