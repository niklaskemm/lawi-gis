import FieldService from "../services/FieldService"
import { stringify } from "wkt"

export async function getFieldByGeom(geom) {
  const geomWKT = stringify(geom)
  const response = await FieldService.getFieldByGeom(geomWKT)

  return { response }
}
