<template>
  <div>
    <explore-map :centerLon="centerLon" :centerLat="centerLat" :zoom="zoom" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ExploreMap from "../components/ExploreMap.vue";

export default defineComponent({
  name: "ExploreMapView",
  components: {
    ExploreMap
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
