import FieldService from "../services/FieldService"
import { stringify } from "wkt"

export async function getFieldByGeom(userId) {
  const response = await FieldService.getFieldByGeom(userId)

  return { response }
}
