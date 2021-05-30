<template>
  <div>
    <div class="main-container">
      <h1>Tob' dich aus!</h1>
      <h3>Klicke einfach irgendwo in Schleswig-Holstein</h3>
      <h3>Anschließend kannst du dir die genaue Niederschlagsverteilung der letzten zwei Wochen dort ansehen</h3>
    </div>
    <div class="map-container">
      <explore-map :centerLon="centerLon" :centerLat="centerLat" :zoom="zoom" />
    </div>
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

<style lang="scss" scoped>
.main-container {
  width: 50%;
  margin: 0 auto;
}
// .map-container {
//   position: relative;
//   width: 100%;
//   bottom: 0;
// }
</style>
