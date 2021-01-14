<template>
  <div>
    <draw-map
      :centerLon="centerLon"
      :centerLat="centerLat"
      :zoom="zoom"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DrawMap from "../components/DrawMap.vue";

export default defineComponent({
  name: "DrawMapView",
  components: {
    DrawMap
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
