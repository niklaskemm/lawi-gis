// INDEX FILE FOR GRID/:ID

<template>
  <div>
    <h1>{{ $route.params.gridId }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "indexGrid",
  components: {}
});

</script>

<style lang="scss" scoped></style>