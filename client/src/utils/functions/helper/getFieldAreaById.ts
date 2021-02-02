import FieldService from "../../services/FieldService"

export async function getFieldAreaById(fieldId: string) {
  const response = await FieldService.getFieldAreaById(fieldId)
  return { response }
}
