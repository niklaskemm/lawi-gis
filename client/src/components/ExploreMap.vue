<template>
  <div>
    <div id="map" class="map"></div>
    <div id="popupContainer" class="popup-container" ref="popupContainer">
      <!-- TODO add closePopup function -->
      <a href="#" id="popupCloser" class="popup-closer" @click="closePopup" />
      <div id="popupContent" class="popup-content">
        <h3>Grid ID: {{ gridId }}</h3>
        <h2>Niederschlag der letzten {{numberOfDays}} Tage:</h2>
        <h2>{{ radolanValue14 }}mm</h2>
      </div>
      <router-link :to="{ name: 'Grid', params: { gridId: gridId } }">Mehr anzeigen</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import "ol/ol.css";
import GeoJSON from "ol/format/GeoJSON";
import { Map, Overlay, View } from "ol";
import { Point } from "ol/geom";
import { OSM } from "ol/source";
import { Tile as TileLayer } from "ol/layer";
import { fromLonLat, transform } from "ol/proj";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { Attribution, defaults as defaultControls } from "ol/control";

import { targetProjection } from "../utils/variables";
import {
  getGridByGeom
} from "../utils/functions/getGridByGeom";
import {
  getRadolanDataByGeom
} from "../utils/functions/getRadolanDataByGeom";
import {
  createStartEndDateString
} from "../utils/functions/helper/createStartEndDateString";

export default defineComponent({
  name: "ExploreMap",
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

    const popupContainer = ref(null);
    const overlay = new Overlay({
      autoPan: {
        animation: {
          duration: 250
        },
        margin: 30
      }
    });

    const layerGrid = new VectorLayer({
      updateWhileInteracting: true
    });

    const gridId = ref(0);
    const radolanValue14 = ref(0);

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

    function closePopup() {
      overlay.setPosition(undefined);
    }

    const numberOfDays = ref(14);
    const { startDateString, endDateString } = createStartEndDateString(numberOfDays.value)
    // const endDate = createStartEndDateString(numberOfDays.value).endDate

    onMounted(() => {
      const map = new Map(mapOptions);
      // eslint-disable-next-line
      overlay.setElement(popupContainer.value!);

      map.on("click", async function (event) {
        const coordinate = new Point(
          event.coordinate
        ).transform("EPSG:3857", targetProjection);
        const coordinateGeoJSON = new GeoJSON().writeGeometryObject(coordinate);

        const APIResultGrid = await getGridByGeom(coordinateGeoJSON);
        const grid = APIResultGrid.response.data.rows[0]

        const APIResultRadolan = await getRadolanDataByGeom(
          coordinateGeoJSON,
          startDateString,
          endDateString
        );
        const radolan = APIResultRadolan.response.data.rows

        gridId.value = grid.id;
        radolanValue14.value = 0

        radolan.forEach((element) => {
          radolanValue14.value += element.value
        })

        radolanValue14.value = radolanValue14.value / 10

        const centroid = new GeoJSON().readFeature(
          grid.centroid, { featureProjection: "EPSG:3857" }
        );

        try {
          map.removeLayer(layerGrid);
        } finally {
          const gridSource = new VectorSource({});

          const gridFeature = new GeoJSON().readFeature(
            grid.geom, { featureProjection: "EPSG:3857" }
          );

          gridSource.addFeature(gridFeature);

          layerGrid.unset("Source");
          layerGrid.setSource(gridSource);

          overlay.setPosition(event.coordinate);
        }
        map.addLayer(layerGrid);
        map.addOverlay(overlay);
      })
    })
    return {
      popupContainer,
      gridId,
      radolanValue14,
      numberOfDays,
      closePopup
    };
  }
});
</script>

<style lang="scss" scoped>
.map {
  position: relative;
  border-radius: 15px;
  width: 90vw;
  height: 50vh;
  // top: 10vh;
  // bottom: 5vh;
  margin: 0 auto;
  overflow: hidden;
}

.popup-container {
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 280px;
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
