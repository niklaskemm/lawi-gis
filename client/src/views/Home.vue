<template>
  <div>
    <h1>This is the Home page.</h1>
    <login />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Login from "../components/Login.vue";

export default defineComponent({
  name: "Home",
  components: {
    Login
  }
});
</script>

<style lang="scss" scoped></style>
