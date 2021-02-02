import MiscService from "../../services/MiscService"

export async function getIntersectionAreaById(fieldId: string, gridId: number) {
  const response = await MiscService.getIntersectionAreaById(fieldId, gridId)
  return { response }
}
