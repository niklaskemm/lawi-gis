import RadolanService from "../services/RadolanService"

export async function getRadolanDataById(id: number) {
  const response = await RadolanService.getRadolanDataById(id)
  return { response }
}
