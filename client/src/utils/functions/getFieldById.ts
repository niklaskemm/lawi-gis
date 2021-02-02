import FieldService from "../services/FieldService"

export async function getFieldById(fieldId: string) {
  const response = await FieldService.getFieldById(fieldId)
  return { response }
}
