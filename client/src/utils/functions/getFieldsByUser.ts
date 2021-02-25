import FieldService from "../services/FieldService"

export async function getFieldsByUser(userId) {
  const response = await FieldService.getFieldsByUser(userId)

  return { response }
}
