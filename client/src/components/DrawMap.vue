<template>
  <div>
    <div id="map" class="map"></div>
    <div id="popupContainer" class="popup-container" ref="popupContainer">
      <!-- TODO add closePopup function -->
      <a href="#" id="popupCloser" class="popup-closer" @click="closePopup" />
      <div id="popupContent" class="popup-content">
        <!-- <p>Geom: {{ featureGeom }}</p> -->
        <p>Name: </p>
        <input v-model="fieldName" name="fieldName" />
        <button @click="deleteFeature">Delete Field</button>
        <button @click="saveFeature">Save Field</button>
      </div>
    </div>
    <button @click="startDraw">Start Drawing</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import "ol/ol.css";
import { Map, View, Overlay } from "ol";
import * as Extent from 'ol/extent';
import { fromLonLat } from "ol/proj";
import { OSM, BingMaps } from "ol/source";
import { Tile as TileLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import {
  Draw,
  Modify,
  Snap,
  Select
} from "ol/interaction";
import GeometryType from "ol/geom/GeometryType";
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style
} from "ol/style";
import { Attribution, defaults as defaultControls } from "ol/control";
import GeoJSON from "ol/format/GeoJSON";

import FieldService from "../utils/services/FieldService";

import { BingMapsApiKey } from "../../src/api_key_config.js";

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
    let map;

    // const layerOSM = new TileLayer({
    //   source: new OSM()
    // });

    const layerBing = new TileLayer({
      source: new BingMaps({
        key: BingMapsApiKey,
        imagerySet: "AerialWithLabelsOnDemand"
      })
    });

    const attribution = new Attribution({
      collapsible: true
    });

    const view = new View({
      center: fromLonLat([props.centerLon, props.centerLat]),
      zoom: props.zoom
    });

    const style = new Style({
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
    });

    const popupContainer = ref(null);
    const overlay = new Overlay({});

    const sourceDraw = new VectorSource();

    const layerDraw = new VectorLayer({
      source: sourceDraw,
      style: style
    });

    const snap = new Snap({ source: sourceDraw });

    const draw = new Draw({
      source: sourceDraw,
      type: GeometryType.POLYGON
    });

    const modify = new Modify({ source: sourceDraw });

    const select = new Select({
      layers: [layerDraw]
    });

    const mapOptions = {
      target: "map",
      view: view,
      layers: [layerBing, layerDraw],
      controls: defaultControls({ attribution: false }).extend([attribution])
    };

    function closePopup() {
      overlay.setPosition(undefined);
      select.getFeatures().clear();
    }

    const fieldName = ref("");
    const featureGeom = ref(String as any);

    async function saveFeature() {
      const feature = select.getFeatures().getArray()[0]
      const fieldGeomGeoJSON = JSON.parse(new GeoJSON().writeFeature(feature, {
        featureProjection: "EPSG:3857"
      }));
      const info = {
        "name": fieldName.value,
        "geom": fieldGeomGeoJSON.geometry
      };
      await FieldService.postField(info);
    }

    function deleteFeature() {
      sourceDraw.clear();
      overlay.setPosition(undefined);
      console.log("Deleted!");
    }

    function startDraw() {
      try {
        sourceDraw.clear();
        map.removeInteraction(select);
        map.addInteraction(draw);
      } finally {
        return
      }
    }

    onMounted(() => {
      map = new Map(mapOptions);

      overlay.setElement(popupContainer.value!);

      map.addInteraction(snap);
      map.addInteraction(modify);

      draw.on("drawend", () => {
        map.removeInteraction(draw);
        map.addInteraction(select);
      });

      select.on("select", (features) => {
        let feature: any;
        feature = features.selected[0];
        if (feature) {
          const extent = feature.getGeometry().getExtent();
          const center = Extent.getCenter(extent);
          overlay.setPosition(center);
          map.getView().fit(extent, {
            size: map.getSize(),
            padding: [20, 20, 20, 20],
            duration: 250
          });
          map.addOverlay(overlay);
        } else {
          overlay.setPosition(undefined);
        }
      });

      snap.on("click", (feature) => {
        snap.removeFeature(feature);
      });
    });

    return {
      closePopup,
      saveFeature,
      deleteFeature,
      startDraw,
      popupContainer,
      featureGeom,
      fieldName
    };
  }
});
</script>

<style lang="scss" scoped>
.map {
  position: absolute;
  width: 100%;
  height: 80%;
}

button {
  position: absolute;
  z-index: 10;
  bottom: 10vh;
}

.popup-container {
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -10px;
  right: -10px;
  min-width: 150px;
  max-width: 80vw;
}

.popup-container:after,
.popup-container:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.popup-container:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.popup-container:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.popup-closer:after {
  content: "✖";
}
</style>
