<template>
  <div id="map" class="map"></div>
  <div id="popupContainer" class="popup-container" ref="popupContainer">
    <a href="#" id="popupCloser" class="popup-closer" @click="closePopup" />
    <div id="popupContent" class="popup-content">
      <h3>{{ gridId }}</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import "ol/ol.css";
import GeoJSON from "ol/format/GeoJSON";
import { Map, Overlay, View } from "ol";
import { fromLonLat, transform } from "ol/proj";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { Attribution, defaults as defaultControls } from "ol/control";

import { targetProjection } from "../utils/variables";
import { getGridDataAtLocation } from "../utils/functions/getGridDataAtLocation";

export default defineComponent({
  name: "Map",
  props: {
    baseLayers: {
      // TODO get rid of 'any'... PropType?
      type: Array as any,
      required: true
    },
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
    },
    clickable: {
      type: Boolean,
      default: true
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

    const mapOptions = {
      target: "map",
      layers: props.baseLayers,
      overlay: [],
      view: view,
      controls: defaultControls({ attribution: false }).extend([attribution])
    };

    onMounted(() => {
      const map = new Map(mapOptions);

      overlay.setElement(popupContainer.value!);

      if (props.clickable) {
        map.on("singleclick", async function(event) {
          const coordinate = event.coordinate;

          const APIResultGrid = await getGridDataAtLocation(
            transform(coordinate, "EPSG:3857", targetProjection)
          );

          gridId.value = APIResultGrid.Data.gridId;

          try {
            map.removeLayer(layerGrid);
          } finally {
            const gridSource = new VectorSource({});

            const gridFeature = new GeoJSON().readFeature(
              APIResultGrid.Data.gridExtentGeoJSON,
              {
                featureProjection: "EPSG:3857"
              }
            );

            gridSource.addFeature(gridFeature);

            layerGrid.unset("Source");
            layerGrid.setSource(gridSource);

            overlay.setPosition(
              fromLonLat(APIResultGrid.Data.gridCentroidLonLat)
            );

            // view.animate({
            //   center: coordinate,
            //   zoom: 13.65,
            //   duration: 500
            // });

            map.addLayer(layerGrid);
            map.addOverlay(overlay);
          }

          return { gridId };
        });
      };
    });

    return { popupContainer, gridId };
  }
});
</script>

<style lang="scss" scoped>
.map {
  position: absolute;
  width: 100%;
  height: 100%;
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
</style>
