<template>
  <div>
    <test-map
      :centerLon="centerLon"
      :centerLat="centerLat"
      :zoom="zoom"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TestMap from "../components/TestMap.vue";

export default defineComponent({
  name: "TestMapView",
  components: {
    TestMap
  },

  setup() {
    const centerLon = 10;
    const centerLat = 54.4;
    const zoom = 8;

    return { centerLon, centerLat, zoom };
  }
});
</script>

<style lang="scss" scoped></style>
