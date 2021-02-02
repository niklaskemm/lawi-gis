import { getPercentPerGrid } from "./helper/getPercentPerGrid"
import { getRadolanDataByGridId } from "./getRadolanDataByGridId"
import { createDatetimeArray } from "./helper/createDatetimeArray"
import RadolanService from "../services/RadolanService"

export async function getRadolanDataByFieldId(
  fieldId: string,
  startDateString: string,
  endDateString: string
) {
  const date = new Date()
  const daysBefore = 14
  const includeAfter = false

  const idPercent = await getPercentPerGrid(fieldId)
  const datetimes = await createDatetimeArray(date, daysBefore, includeAfter)

  // const radolanDataPerGrid = 0
  // const radolanDataPerGridComplete = 0
  const radolanDataPerGridDaily = 0
  const radolanDataPerGridHourly = 0

  const radolanDataPerGridWeighted = 0
  const radolanDataPerGridWeightedComplete = 0
  const radolanDataPerGridWeightedDaily = 0
  const radolanDataPerGridWeightedHourly = 0

  const radolanDataPerField = 0
  const radolanDataPerFieldComplete = 0
  const radolanDataPerFieldDaily = 0
  const radolanDataPerFieldHourly = 0
  // datetimes.length

  setTimeout(async () => {
    for (let element of idPercent) {
      const radolanDataPerGrid = await getRadolanDataByGridId(
        element.gridId,
        startDateString,
        endDateString
      )

      let radolanDataPerGridComplete = 0
      radolanDataPerGrid.response.data.values.forEach((value) => {
        radolanDataPerGridComplete += value
      })
      console.log(element.gridId, radolanDataPerGridComplete)

      // let weightedSum = 0
      // weightedSum = sumValues * element.percent
      // totalweightedSums += weightedSum
    }
    // console.log(idPercent.length)
    // totalRain = totalweightedSums / idPercent.length
    // console.log(totalRain / daysBefore)
  }, 100)
}
