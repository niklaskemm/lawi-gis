<template>
  <div>
    <click-map
      :centerLon="centerLon"
      :centerLat="centerLat"
      :zoom="zoom"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClickMap from "../components/ClickMap.vue";

export default defineComponent({
  name: "ClickMapView",
  components: {
    ClickMap
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
