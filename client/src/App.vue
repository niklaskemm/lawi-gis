<template>
  <div id="app">
    <Suspense>
      <template #default>
        <router-view />
      </template>
      <template #fallback>
        <span>I'm a loading screen, I'm waiting the view to be ready!</span>
      </template>
    </Suspense>
    <!-- <navbar /> -->
  </div>
</template>

<script lang="ts">
// import Navbar from "@/components/Navbar.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "app",
  components: {
    // Navbar
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
