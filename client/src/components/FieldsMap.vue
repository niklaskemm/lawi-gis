<template>
  <div>
    <div id="map" class="map"></div>
    <div id="popupContainer" class="popup-container" ref="popupContainer">
      <!-- TODO add closePopup function -->
      <a href="#" id="popupCloser" class="popup-closer" @click="closePopup" />
      <div id="popupContent" class="popup-content">
        <!-- <h3>Field: {{ fieldName }}</h3> -->
        <h2>Niederschlag der letzten {{numberOfDays}} Tage:</h2>
        <h2>{{ radolanValue14 }}mm</h2>
      </div>
      <!-- <router-link :to="{ name: 'Field', params: { fieldId: fieldId } }">Mehr anzeigen</router-link> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import "ol/ol.css";
import GeoJSON from "ol/format/GeoJSON";
import { Map, Overlay, View } from "ol";
import { BingMaps } from "ol/source";
import { Tile as TileLayer } from "ol/layer";
import { fromLonLat } from "ol/proj";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { Attribution, defaults as defaultControls } from "ol/control";

import { getFields } from "../utils/functions/getFields";
import {
  getFieldByGeom
} from "../utils/functions/getFieldByGeom";
import {
  createStartEndDateString
} from "../utils/functions/helper/createStartEndDateString";

import { BingMapsApiKey } from "@/api_key_config.js";

export default defineComponent({
  name: "FieldsMap",
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

    const fieldName = ref("");
    const fieldId = ref("");
    const radolanValue14 = ref(0);

    const layerBing = new TileLayer({
      source: new BingMaps({
        key: BingMapsApiKey,
        imagerySet: "AerialWithLabelsOnDemand"
      })
    });

    const sourceFields = new VectorSource({
    })

    const layerFields = new VectorLayer({
      source: sourceFields
    })

    const mapOptions = {
      target: "map",
      layers: [layerBing, layerFields],
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

    onMounted(async () => {
      const fields = (await getFields()).response.data
      // const fields = (await getFieldsByUser(props.userId)).repsponse.data

      console.log(fields)

      for (const field of fields) {
        const feature = new GeoJSON().readFeature(
          field.geom, { featureProjection: "EPSG:3857" }
        )
        feature.setId(field.id)
        sourceFields.addFeature(feature)
      }

      const map = new Map(mapOptions);
      // eslint-disable-next-line
      overlay.setElement(popupContainer.value!);

      map.on("click", function (event) {
        map.forEachFeatureAtPixel(event.pixel, async function (feature) {
          const geom: any = feature.getGeometry()
          const gjson = new GeoJSON().writeGeometryObject(geom, {
            dataProjection: "EPSG:4326",
            featureProjection: "EPSG:3857",
            rightHanded: true
          })
          const field = (await getFieldByGeom(gjson)).response.data[0]
          console.log(field)
        });
        overlay.setPosition(event.coordinate)
        map.addOverlay(overlay);
      })
    })
    return {
      popupContainer,
      fieldName,
      fieldId,
      radolanValue14,
      numberOfDays,
      closePopup
    };
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
