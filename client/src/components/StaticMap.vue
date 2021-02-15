<template>
  <div id="map" class="map"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import "ol/ol.css";
import { Map, View } from "ol";
import GeoJSON from "ol/format/GeoJSON";
import { Attribution } from "ol/control";
import { Tile as TileLayer } from "ol/layer";
import { Vector as VectorLayer } from "ol/layer";
import { OSM, BingMaps, Vector as VectorSource } from "ol/source";

import { BingMapsApiKey } from "../../src/api_key_config.js";
import { getGridById } from "../utils/functions/getGridById";
import { getFieldById } from "../utils/functions/getFieldById";

export default defineComponent({
  name: "StaticMap",
  props: {
    fieldId: {
      type: Boolean,
      default: false
    },
    gridId: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      required: true
    }
  },

  setup(props) {
    onMounted(async () => {
      let response: any

      if (props.fieldId) {
        response = await getFieldById(props.id)
      } else if (props.gridId) {
        response = await getGridById(parseInt(props.id))
      } else {
        console.log("ERROR!")
      }

      const featureObject = new GeoJSON().readFeature(
        response.response.data.geom, { featureProjection: "EPSG:3857" }
      )

      const attribution = new Attribution({
        collapsible: true
      });

      const sourceObject = new VectorSource({
        features: [featureObject]
      })

      const layerObject = new VectorLayer({
        source: sourceObject
      });

      const layerBing = new TileLayer({
        source: new BingMaps({
          key: BingMapsApiKey,
          imagerySet: "AerialWithLabelsOnDemand"
        })
      });

      const layerOSM = new TileLayer({
        source: new OSM()
      });

      let layers = [] as any
      if (props.fieldId) {
        layers = [layerBing, layerObject]
      } else if (props.gridId) {
        layers = [layerOSM, layerObject]
      } else {
        console.log("ERROR!")
      }

      const view = new View({
        center: [10, 10],
        zoom: 10
      });

      const mapOptions = {
        target: "map",
        layers: layers,
        view: view,
        controls: []
      };

      const map = new Map(mapOptions)

      const feature = sourceObject.getFeatures()[0]
      if (feature) {
        const extent = feature!.getGeometry()!.getExtent()
        view.fit(extent, {
          size: map.getSize(),
          padding: [50, 25, 50, 25],
          maxZoom: 18
        })
      }
    });
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
