import RadolanService from "../services/RadolanService"

export async function getRadolanDataByGridId(
  gridId: number,
  startDateString: string,
  endDateString: string
) {
  const response = await RadolanService.getRadolanByGridId(
    gridId,
    startDateString,
    endDateString
  )

  return { response }
}
