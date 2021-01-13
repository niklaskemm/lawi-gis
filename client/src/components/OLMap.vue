<template>
  <div>
    <div id="map" class="map"></div>
  </div>
</template>

<script lang="ts" scoped>
import { defineComponent, onMounted } from "vue";

// ! IMPORT OL CLASSES
import GeoJSON from "ol/format/GeoJSON";
import { MapOptions } from "ol/PluggableMap";
import { transform, fromLonLat } from "ol/proj";
import { Map, View, Overlay } from "ol";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Attribution, defaults as defaultControls } from "ol/control";
import { Fill, Stroke, Style } from "ol/style";
// import { Geolocation } from "ol";
// import { GeolocationError } from "ol/Geolocation";

// ! IMPORT OL STYLES
import "ol/ol.css";

// ! IMPORT VARIABLES
import {
  centerLon,
  centerLat,
  zoom,
  coordPrecision,
  targetProjection
} from "../utils/variables";

// ! IMPORT SERVICES
import GridService from "../utils/services/GridService";

export default defineComponent({
  name: "OLMap",
  components: {},

  setup() {
    // ! GENERAL VARIABLES
    // register the filter used to get data from db
    const gridFilter = ["g.id", "g.geom", "g.centroid"];

    // ! BASIC OPENLAYERS SETUP
    const attribution: Attribution = new Attribution({
      collapsible: true
    });

    const view: View = new View({
      center: fromLonLat([centerLon, centerLat]),
      zoom: zoom
    });

    // ! STYLE SETUP
    const styleGrid = new Style({
      stroke: new Stroke({
        color: "blue",
        width: 3
      }),
      fill: new Fill({
        color: "rgba(0, 0, 255, 0.1)"
      })
    });

    // ! BASIC LAYER SETUP
    const layerOSM = new TileLayer({
      source: new OSM()
    });

    const layerGrid = new VectorLayer({
      style: styleGrid,
      updateWhileInteracting: true,
      zIndex: 2
    });

    // TODO add draw layer

    // ! BASIC OVERLAY SETUP
    const overlayGrid = new Overlay({
      element: undefined,
      position: undefined
    });

    // ! GEOLOCATION SUPPORT
    // let geolocationError: GeolocationError;
    // const accuracyFeature: Feature = new Feature();
    // const positionFeature: Feature = new Feature();

    // positionFeature.setStyle(
    //   new Style({
    //     image: new CircleStyle({
    //       radius: 6,
    //       fill: new Fill({
    //         color: "#3399CC"
    //       }),
    //       stroke: new Stroke({
    //         color: "#fff",
    //         width: 2
    //       })
    //     })
    //   })
    // );

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

    // const layerGeolocation = new VectorLayer({});

    // ! MAPOPTIONS SETUP
    const mapOptions: MapOptions = {
      target: "map",
      layers: [layerOSM],
      overlays: [],
      view: view,
      controls: defaultControls({ attribution: false }).extend([attribution])
    };

    // ! HELPER FUNCTIONS
    async function getGridDataAtLocation(LonLat) {
      // build WKT representation of clicked coordinate
      const gridWKT = `POINT (${LonLat[0]} ${LonLat[1]})`;
      // make POST request to backend server to retrieve filtered data
      const response = await GridService.getGridById(gridFilter, gridWKT);

      const Data = {
        gridId: response.data[0][0].id,
        gridExtentGeoJSON: response.data[0][0].geom,
        gridCentroidGeoJSON: response.data[0][0].centroid,
        gridCentroidLonLat: [0, 0]
      };

      Data.gridCentroidLonLat = [
        Data.gridCentroidGeoJSON.coordinates[0],
        Data.gridCentroidGeoJSON.coordinates[1]
      ];

      return { Data };
    }

    // ! IMPLEMENTATION OF MAP
    onMounted(async () => {
      // ask for location permission
      // geolocation.setTracking(true);

      // geolocation.on("error", function(error) {
      //   geolocationError = error;
      // });

      // register mapOptions on new Map
      const map: Map = new Map(mapOptions);

      // ! define onClick behaviour of map
      map.on("singleclick", async function(pixel) {
        // set the clicked coordinate values
        const coordClicked: Array<number> = [];
        coordClicked[0] =
          Math.round(
            transform(pixel.coordinate, "EPSG:3857", targetProjection)[0] *
              coordPrecision
          ) / coordPrecision;
        coordClicked[1] =
          Math.round(
            transform(pixel.coordinate, "EPSG:3857", targetProjection)[1] *
              coordPrecision
          ) / coordPrecision;

        const APIResultGrid = await getGridDataAtLocation(coordClicked);

        try {
          map.removeLayer(layerGrid);
        } finally {
          const gridFeature = new GeoJSON().readFeature(
            APIResultGrid.Data.gridExtentGeoJSON,
            {
              featureProjection: "EPSG:3857"
            }
          );
          // TODO add popup with gridId
          const gridSource = new VectorSource({});
          gridSource.addFeature(gridFeature);

          layerGrid.unset("Source");
          layerGrid.setSource(gridSource);

          // OverlayGrid.props.gridId = gridId;
          overlayGrid.setPosition(
            fromLonLat(APIResultGrid.Data.gridCentroidLonLat)
          );
          // overlayGrid.setPositioning('center-center');
          // overlayGrid.setElement(OverlayGridRef.$el)

          console.log(APIResultGrid.Data.gridId);

          map.addLayer(layerGrid);
          map.addOverlay(overlayGrid);

          view.animate({
            center: fromLonLat(APIResultGrid.Data.gridCentroidLonLat),
            zoom: 13.65,
            duration: 500
          });
        }
      });
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
