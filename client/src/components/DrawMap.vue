<template>
  <div>
    <div id="map" class="map"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

import "ol/ol.css";
import { Map, View } from "ol";
import { fromLonLat } from "ol/proj";
import { OSM } from "ol/source";
import { Tile as TileLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { Draw, Modify, Snap } from "ol/interaction";
import GeometryType from "ol/geom/GeometryType";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { Attribution, defaults as defaultControls } from "ol/control";

export default defineComponent({
  name: "DrawMap",
  props: {
    centerLon: {
      type: Number,
      default: 0
    },
    centerLat: {
      type: Number,
      default: 0
    },
    zoom: {
      type: Number,
      default: 10
    }
  },

  setup(props) {
    const attribution = new Attribution({
      collapsible: true
    });

    const view = new View({
      center: fromLonLat([props.centerLon, props.centerLat]),
      zoom: props.zoom
    });

    const sourceDraw = new VectorSource();
    const layerDraw = new VectorLayer({
      source: sourceDraw,
      style: new Style({
        fill: new Fill({
          color: "rgba(255, 255, 255, 0.2)"
        }),
        stroke: new Stroke({
          color: "#ffcc33",
          width: 2
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: "#ffcc33"
          })
        })
      })
    });

    const modify = new Modify({ source: sourceDraw });

    let draw, snap;

    const layerOSM = new TileLayer({
      source: new OSM()
    });

    const mapOptions = {
      target: "map",
      layers: [layerOSM],
      overlay: [],
      view: view,
      controls: defaultControls({ attribution: false }).extend([attribution])
    };

    onMounted(() => {
      const map = new Map(mapOptions);

      map.addLayer(layerDraw);
      map.addInteraction(modify);

      function addInteractions() {
        draw = new Draw({
          source: sourceDraw,
          type: GeometryType.POLYGON
        });
        map.addInteraction(draw);
        snap = new Snap({ source: sourceDraw });
        map.addInteraction(snap);
      }

      addInteractions();
    });

    return {};
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
