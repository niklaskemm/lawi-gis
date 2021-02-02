import GridService from "../services/GridService"

export async function getGridById(id: number) {
  const response = await GridService.getGridById(id)
  return { response }
}
