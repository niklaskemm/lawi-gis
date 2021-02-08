import FieldService from "../../services/FieldService"
import GridService from "../../services/GridService"
import MiscService from "../../services/MiscService"
import { stringify } from "wkt"

export async function getPercentPerGrid(fieldId: string) {
  const field = await FieldService.getFieldById(fieldId)
  const grid = await GridService.getGridByGeom(stringify(field.data.geom))

  const fieldArea = (await FieldService.getFieldAreaById(fieldId)).data[0]
    .st_area

  const gridList = grid.data.rows

  const idPercent = [] as any

  for (const element of gridList) {
    const intersectionArea = (
      await MiscService.getIntersectionAreaById(element.id, fieldId)
    ).data[0].st_area
    const percent =
      Math.round(
        ((intersectionArea / fieldArea) * 100 + Number.EPSILON) * 10000
      ) / 10000
    const data = { gridId: element.id, percent: percent }
    idPercent.push(data)
  }

  return idPercent
}
