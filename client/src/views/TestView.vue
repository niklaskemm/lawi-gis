<template>
  <div>
    <testing />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Testing from "../components/Testing.vue";

export default defineComponent({
  name: "TestView",
  components: {
    Testing
  }
});
</script>

<style lang="scss" scoped></style>
