<template>
  <div>
    <Map
      :baseLayers="baseLayers"
      :centerLon="centerLon"
      :centerLat="centerLat"
      :zoom="zoom"
      :clickable="false"
    />
  </div>
  <!-- <div>
    <OLMap />
  </div> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Map from "../components/Map.vue";
// import OLMap from "../components/OLMap.vue";

import { layerOSM } from "../utils/baselayers";

export default defineComponent({
  name: "Testing",
  components: {
    // OLMap,
    Map
  },

  setup() {
    const baseLayers = [
      layerOSM
      // layerStamenToner
    ];

    const centerLon = 10;
    const centerLat = 54.4;
    const zoom = 8;

    return { baseLayers, centerLon, centerLat, zoom };
  }
});
</script>

<style lang="scss" scoped></style>
