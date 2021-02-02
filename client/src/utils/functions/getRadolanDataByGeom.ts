import RadolanService from "../services/RadolanService"
import { stringify } from "wkt"

export async function getRadolanDataByGeom(
  geom,
  startDateString: string,
  endDateString: string
) {
  const geomWKT = stringify(geom)
  // make POST request to backend server to retrieve filtered data
  const response = await RadolanService.getRadolanByGeom(
    geomWKT,
    startDateString,
    endDateString
  )

  // const Data = {
  //   radolanData: response.data.rows,
  //   radolanValue14: 0
  // }

  // const today = new Date().getTime()

  // Data.radolanData.forEach((element) => {
  //   const dtObject = new Date(element.time).getTime()
  //   const diffDays = (today - dtObject) / (1000 * 3600 * 24)
  //   if (diffDays <= 14) {
  //     Data.radolanValue14 += element.value
  //   }
  // })

  return { response }
}
