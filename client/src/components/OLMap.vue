<template>
  <div id="app">
    <h1>{{ coordClicked }}</h1>
    <h1>{{ gridId }}</h1>
    <h2 v-if="geolocationError">{{ geolocationError }}</h2>
    <div id="map" class="map"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from "vue";

import "ol/ol.css";

import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Geolocation from "ol/Geolocation";
import { Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { Attribution, defaults as defaultControls } from "ol/control";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { transform, fromLonLat } from "ol/proj";

import { centerLon, centerLat, zoom, coordPrecision } from "../utils/variables";
import { targetProjection } from "../utils/variables";

import { MapOptions } from "ol/PluggableMap";
import { Coordinate } from "ol/coordinate";

export default defineComponent({
  name: "OLMap",

  setup() {
    // GENERAL VARIABLES
    const coordClicked: Ref<Array<number>> = ref([]);
    const gridId: Ref<number> = ref(0);
    let geolocationError = undefined;
    const accuracyFeature = new Feature();
    const positionFeature = new Feature();

    // BASIC OPENLAYERS SETUP
    const attribution: Attribution = new Attribution({
      collapsible: true
    });

    const layerOSM = new TileLayer({
      source: new OSM()
    });

    const view = new View({
      center: fromLonLat([centerLon, centerLat]),
      zoom: zoom
    });

    // GEOLOCATION SUPPORT
    const geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true
      },
      projection: view.getProjection()
    });

    // geolocation.on("change:accuracyGeometry", function() {
    //   accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
    // });

    positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: "#3399CC"
          }),
          stroke: new Stroke({
            color: "#fff",
            width: 2
          })
        })
      })
    );

    // let userCoordinates: Coordinate;
    // geolocation.on("change:position", function() {
    //   const coordinates: Coordinate = geolocation.getPosition();
    //   positionFeature.setGeometry(new Point(coordinates));
    //   userCoordinates = coordinates;
    // });

    // const layerGeolocation = new VectorLayer({
    //   source: new VectorSource({
    //     features: [accuracyFeature, positionFeature]
    //   })
    // });

    // MAPOPTIONS SETUP
    const mapOptions: MapOptions = {
      target: "map",
      layers: [layerOSM],
      // layers: [layerOSM, layerGeolocation],
      view: view,
      controls: defaultControls({ attribution: false }).extend([attribution])
    };

    // IMPLEMENTATION OF MAP & SUPPORT FUNCTIONS
    onMounted(async () => {
      // ask for location permission
      geolocation.setTracking(true);

      geolocation.on("error", function(error) {
        geolocationError = error;
      });

      // register mapOptions on new Map
      const map: Map = new Map(mapOptions);

      // define onClick behaviour of map
      map.on("click", function(pixel) {
        coordClicked.value[0] =
          Math.round(
            transform(pixel.coordinate, "EPSG:3857", targetProjection)[0] *
              coordPrecision
          ) / coordPrecision;
        coordClicked.value[1] =
          Math.round(
            transform(pixel.coordinate, "EPSG:3857", targetProjection)[1] *
              coordPrecision
          ) / coordPrecision;
        gridId.value = gridId.value + 1;
      });
    });

    return { coordClicked, geolocationError, gridId };
  }
});
</script>

<style lang="scss" scoped>
.map {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
