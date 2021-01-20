<template>
  <nav class="navbar">
    <ul class="navbar__list">
      <li class="navbar__item">
        <router-link class="navbar__link" to="/">Home</router-link>
      </li>
      <li class="navbar__item">
        <router-link class="navbar__link" to="/about">About</router-link>
      </li>
      <li class="navbar__item">
        <router-link class="navbar__link" to="/contact">Contact</router-link>
      </li>
      <li class="navbar__item">
        <router-link class="navbar__link" to="/testing">Testing</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: "Navbar",
})
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  border: solid 1px $primary;
  bottom: 0;
  left: 0;
  width: 100%;

  & .navbar__list {
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    & .navbar__item {
      list-style: none;

      & .navbar__link {
        font-weight: bold;
        color: #2c3e50;
        text-decoration: none;
      }
    }
  }
}
</style>
