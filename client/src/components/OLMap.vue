<template>
  <div id="app">
    <div id="map" class="map"></div>
  </div>
</template>

<script>
import "ol/ol.css"
import { Map, View } from "ol"
import TileLayer from "ol/layer/Tile"
import OSM from "ol/source/OSM"

export default {
  async mounted() {
    await this.initiateMap()
  },
  methods: {
    initiateMap() {
      const map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: [0, 0],
          zoom: 0
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.map {
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>
