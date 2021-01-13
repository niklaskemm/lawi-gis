import GridService from "../services/GridService";

export async function getGridDataAtLocation(
  LonLat,
  gridFilter = ["g.id", "g.geom", "g.centroid"]
) {
  const gridWKT = `POINT (${LonLat[0]} ${LonLat[1]})`;
  // make POST request to backend server to retrieve filtered data
  const response = await GridService.getGridByGeom(gridFilter, gridWKT);

  const Data = {
    gridId: response.data.rows[0].id,
    gridExtentGeoJSON: response.data.rows[0].geom,
    gridCentroidGeoJSON: response.data.rows[0].centroid,
    gridCentroidLonLat: [0, 0]
  };

  Data.gridCentroidLonLat = [
    Data.gridCentroidGeoJSON.coordinates[0],
    Data.gridCentroidGeoJSON.coordinates[1]
  ];

  return { Data };
}
