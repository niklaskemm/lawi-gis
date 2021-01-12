import { OSM, Stamen } from "ol/source";
import { Tile as TileLayer } from "ol/layer";

const layerOSM = new TileLayer({
  source: new OSM()
});

const layerStamenToner = new TileLayer({
  source: new Stamen({
    layer: "toner"
  })
});

export { layerOSM, layerStamenToner };
