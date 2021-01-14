<template>
  <div>
    <div id="map" class="map"></div>
    <div id="popupContainer" class="popup-container" ref="popupContainer">
      <!-- TODO add closePopup function -->
      <a href="#" id="popupCloser" class="popup-closer" />
      <div id="popupContent" class="popup-content">
        <h3>Grid ID: {{ gridId }}</h3>
        <h2>Niederschlag der letzten 14 Tage:</h2>
        <h2>{{ radolanValue14 }}mm</h2>
      </div>
      <router-link :to="{ name: 'Grid', params: { gridId: gridId } }"
        >Mehr anzeigen</router-link
      >
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
import { Draw, Modify, Snap } from 'ol/interaction';
import GeometryType from "ol/geom/GeometryType";
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import { Attribution, defaults as defaultControls } from "ol/control";

import { targetProjection } from "../utils/variables";
import { getGridDataAtLocation } from "../utils/functions/getGridDataAtLocation";
import { getRadolanDataAtLocation } from "../utils/functions/getRadolanDataAtLocation";

export default defineComponent({
  name: "Map",
  props: {
    baseLayers: {
      // TODO get rid of 'any'... PropType?
      // eslint-disable-next-line
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

    const sourceDraw = new VectorSource();
    const layerDraw = new VectorLayer({
      source: sourceDraw,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    });

    const layers = [] as any;

    for (const baselayer of props.baseLayers) {
      layers.push(baselayer);
    };

    layers.push(layerDraw);

    const modify = new Modify({source: sourceDraw});

    let draw, snap;

    const gridId = ref(0);
    const radolanValue14 = ref(0);

    const mapOptions = {
      target: "map",
      layers: layers,
      overlay: [],
      view: view,
      controls: defaultControls({ attribution: false }).extend([attribution])
    };

    onMounted(() => {
      const map = new Map(mapOptions);
      // eslint-disable-next-line
      overlay.setElement(popupContainer.value!);
      map.addInteraction(modify);

      function addInteractions() {
        draw = new Draw({
          source: sourceDraw,
          type: GeometryType.POLYGON,
        });
        map.addInteraction(draw);
        snap = new Snap({source: sourceDraw});
        map.addInteraction(snap);
      };

      addInteractions();

      if (props.clickable) {
        map.on("singleclick", async function(event) {
          const coordinate = event.coordinate;

          const APIResultGrid = await getGridDataAtLocation(
            transform(coordinate, "EPSG:3857", targetProjection)
          );

          const APIResultRadolan = await getRadolanDataAtLocation(
            transform(coordinate, "EPSG:3857", targetProjection)
          );

          gridId.value = APIResultGrid.Data.gridId;
          radolanValue14.value = APIResultRadolan.Data.radolanValue14;

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
        });
      }
    });

    return { popupContainer, gridId, radolanValue14 };
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
