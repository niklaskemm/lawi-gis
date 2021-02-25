<template>
  <div>
    <login-component />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import LoginComponent from "../components/Login.vue";

export default defineComponent({
  name: "LoginView",
  components: {
    LoginComponent
  }
});
</script>

<style lang="scss" scoped></style>
