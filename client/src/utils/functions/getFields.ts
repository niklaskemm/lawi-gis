import FieldService from "../services/FieldService"

export async function getFields() {
  const response = await FieldService.getFields()
  return { response }
}
