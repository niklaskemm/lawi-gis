<template>
  <div>
    <register-component />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import RegisterComponent from "../components/Register.vue";

export default defineComponent({
  name: "RegisterView",
  components: {
    RegisterComponent
  }
});
</script>

<style lang="scss" scoped></style>
