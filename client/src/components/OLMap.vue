<template>
  <div id="app">
    <div id="map" class="map"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from "vue";

import GeoJSON from 'ol/format/GeoJSON';
import { Point, Polygon } from "ol/geom";
import { Coordinate } from "ol/coordinate";
import { MapOptions } from "ol/PluggableMap";
import { transform, fromLonLat } from "ol/proj";
import { GeolocationError } from "ol/Geolocation";
import { Map, View, Feature, Geolocation } from "ol";
import { OSM, Source, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Attribution, defaults as defaultControls } from "ol/control";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";

import "ol/ol.css";

import { centerLon, centerLat, zoom, coordPrecision, targetProjection } from "../utils/variables";

import GridService from "../utils/services/GridService"
import LayerRenderer from "ol/renderer/Layer";

export default defineComponent({
  name: "OLMap",

  setup() {
    // ! GENERAL VARIABLES
    const coordClicked: Ref<Array<number>> = ref([]);
    const gridId: Ref<number> = ref(0);
    let geolocationError:GeolocationError;
    const accuracyFeature: Feature = new Feature();
    const positionFeature: Feature = new Feature();

    let response:any;

    // ! BASIC OPENLAYERS SETUP
    const attribution: Attribution = new Attribution({
      collapsible: true
    });

    const view: View = new View({
      center: fromLonLat([centerLon, centerLat]),
      zoom: zoom
    });

    // ! STYLE SETUP
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

    const styleGrid = new Style({
      stroke: new Stroke({
        color: 'blue',
        width: 3,
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.1)',
      }),
    })

    // ! BASIC LAYER SETUP
    const layerOSM = new TileLayer({
      source: new OSM()
    });

    const layerGrid = new VectorLayer({
      style: styleGrid,
      updateWhileInteracting: true,
      zIndex: 2,
    });

    // TODO add draw layer

    // const layerGeolocation = new VectorLayer({});
    
    // ! GEOLOCATION SUPPORT
    // const geolocation = new Geolocation({
    //   trackingOptions: {
    //     enableHighAccuracy: true
    //   },
    //   projection: view.getProjection()
    // });

    // geolocation.on("change:accuracyGeometry", function() {
    //   accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
    // });

    // geolocation.on("change:position", function() {
    //   if ( geolocation.getPosition()) {
    //     const coordinates: Coordinate = geolocation.getPosition();
    //     positionFeature.setGeometry(new Point(coordinates));
    //   }
    // });

    // layerGeolocation.setSource( new VectorSource({
    //     features: [accuracyFeature, positionFeature]
    //   })
    // )

    // ! MAPOPTIONS SETUP
    const mapOptions: MapOptions = {
      target: "map",
      layers: [layerOSM],
      view: view,
      controls: defaultControls({ attribution: false }).extend([attribution])
    };

    // ! IMPLEMENTATION OF MAP & SUPPORT FUNCTIONS
    onMounted(async () => {
      // ask for location permission
      // geolocation.setTracking(true);

      // geolocation.on("error", function(error) {
      //   geolocationError = error;
      // });

      // register mapOptions on new Map
      const map: Map = new Map(mapOptions);

      // ! define onClick behaviour of map
      map.on("click", async function(pixel) {
        // set the clicked coordinate values
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

        // register the filter used to get data from db
        const gridFilter = ["g.id", "g.geom", "g.centroid"]
        // build WKT representation of clicked coordinate
        const gridWKT = `POINT (${coordClicked.value[0]} ${coordClicked.value[1]})` 

        // make POST request to backend server to retrieve filtered data
        response = await GridService.getGridById(gridFilter, gridWKT)

        // get grid extent GeoJSON from response
        const gridExtentGeoJSON = response.data[0][0].geom
        // get grid centroid GeoJSON from response
        const gridCentroidGeoJSON = response.data[0][0].centroid
        // get gridId from response
        const gridId = response.data[0][0].id
        
        try {
          map.removeLayer(layerGrid)
        } finally {
          const gridSource = new VectorSource({})
          const gridFeature = new Feature({
            geometry: new GeoJSON().readGeometry(gridExtentGeoJSON, {featureProjection: "EPSG:3857"}),
            labelPoint: new GeoJSON().readGeometry(gridCentroidGeoJSON, {featureProjection: "EPSG:3857"}),
            name: gridId
            // TODO show ID or arbitrary name at centroid
          })
          
          gridSource.addFeature(gridFeature)

          layerGrid.unset("Source")
          layerGrid.setSource(gridSource)

          map.addLayer(layerGrid)

          console.log(gridCentroidGeoJSON)

          // TODO add zoom to grid
        }
      })
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
