import GridService from "../services/GridService"
import { stringify } from "wkt"

export async function getGridByGeom(geom) {
  const geomWKT = stringify(geom)
  const response = await GridService.getGridByGeom(geomWKT)

  return { response }
}
