<template>
  <div>
    <div id="map" class="map"></div>
    <div id="popupContainer" class="popup-container" ref="popupContainer">
      <a href="#" id="popupCloser" class="popup-closer" @click="closePopup" />
      <div id="popupContent" class="popup-content">
        <h3>{{ fieldName }}</h3>
        <h2>Niederschlag der letzten {{numberOfDays}} Tage:</h2>
        <h2>{{ radolanValue14 }}mm</h2>
      </div>
      <router-link :to="`/user/${userId}/${fieldIdClicked}`">Mehr anzeigen</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import "ol/ol.css";
import GeoJSON from "ol/format/GeoJSON";
import { Map, Overlay, View } from "ol";
import { BingMaps } from "ol/source";
import { Tile as TileLayer } from "ol/layer";
import { fromLonLat } from "ol/proj";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { Attribution, defaults as defaultControls } from "ol/control";

import { getFieldsByUser } from "../utils/functions/getFieldsByUser";
import {
  getFieldByGeom
} from "../utils/functions/getFieldByGeom";
import {
  createStartEndDateString
} from "../utils/functions/helper/createStartEndDateString";

import { BingMapsApiKey } from "@/api_key_config.js";
import {
  getRadolanDataByFieldId
} from "../utils/functions/getRadolanDataByFieldId";

export default defineComponent({
  name: "FieldsMap",
  props: {
    userId: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const route = useRoute()
    const user = props.userId
    // const userId = route.params.userId

    const attribution = new Attribution({
      collapsible: true
    });

    const view = new View({
      center: [10, 10],
      zoom: 10
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

    const radolanValue14 = ref(0);
    const fieldName = ref("")
    const fieldIdClicked = ref("")

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
      const fields = (await getFieldsByUser(props.userId)).response.data

      for (const field of fields) {
        const feature = new GeoJSON().readFeature(
          field.geom, { featureProjection: "EPSG:3857" }
        )
        sourceFields.addFeature(feature)
      }

      const map = new Map(mapOptions);
      // eslint-disable-next-line
      overlay.setElement(popupContainer.value!);

      view.fit(sourceFields!.getExtent(), {
        size: map.getSize(),
        padding: [50, 25, 50, 25],
        maxZoom: 18
      })

      map.on("click", function (event) {
        try {
          map.forEachFeatureAtPixel(event.pixel, async function (feature) {
            const geom: any = feature.getGeometry()
            const gjson = new GeoJSON().writeGeometryObject(geom, {
              dataProjection: "EPSG:4326",
              featureProjection: "EPSG:3857",
              rightHanded: true
            })
            const field = (await getFieldByGeom(gjson)).response.data[0]

            const radolan = await getRadolanDataByFieldId(
              field.id,
              startDateString,
              endDateString
            )

            radolanValue14.value = radolan.complete / 10
            fieldName.value = field.name
            fieldIdClicked.value = field.id

            overlay.setPosition(event.coordinate)
            map.addOverlay(overlay);
          });
        } catch {
          return
        }
      })
    })
    return {
      popupContainer,
      user,
      fieldIdClicked,
      props,
      fieldName,
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
