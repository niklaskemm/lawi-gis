<template>
  <div>
    <div class="main-container">
      <h1>Füge ein neues Feld hinzu</h1>
      <h3>Sobald du dein Feld auf der Karte sehen kannst, klicke auf “Zeichnen beginnen”
        Anschließend kannst du mit mehreren Klicks dein Feld umranden. Ein Doppelklick verbindet automatisch den letzten mit dem ersten Punkt. Alternativ kannst du auch auf den ersten Punkt klicken. Gib’ dann deinem Feld einen Namen und klicke auf “Speichern”. Fertig!</h3>
    </div>
    <div class="map-container">
      <draw-map :centerLon="centerLon" :centerLat="centerLat" :zoom="zoom" />
    </div>
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

<style lang="scss" scoped>
.main-container {
  width: 50%;
  margin: 0 auto;
}
// .map-container {
//   position: relative;
//   // align-content: center;
//   width: 100vw;
//   height: 40vh;
//   // margin: 0 auto;
// }
</style>
