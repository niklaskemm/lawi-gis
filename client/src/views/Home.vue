<template>
  <div>
    <h1>This is the Home page.</h1>
    <login />
    <register />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

export default defineComponent({
  name: "Home",
  components: {
    Login,
    Register
  }
});
</script>

<style lang="scss" scoped></style>
