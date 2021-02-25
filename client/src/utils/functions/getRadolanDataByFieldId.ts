import { getPercentPerGrid } from "./helper/getPercentPerGrid"
import { getRadolanDataByGridId } from "./getRadolanDataByGridId"
import { createDatetimeArray } from "./helper/createDatetimeArray"
import {
  createRadolanHourlyValuesArray //
} from "./helper/createRadolanHourlyValuesArray"
import {
  createRadolanDailyValuesArray //
} from "./helper/createRadolanDailyValuesArray"

function round(value, precision = 0) {
  const multiplier = Math.pow(10, precision)
  return Math.round(value * multiplier) / multiplier
}

export async function getRadolanDataByFieldId(
  fieldId: string,
  startDateString: string,
  endDateString: string,
  after = false
) {
  const startDate = new Date(startDateString)
  const endDate = new Date(endDateString)
  let eventDate = new Date(startDateString)
  eventDate.setDate(startDate.getDate() + 14)
  let daysBefore = 14

  const includeAfter = after

  const { timestampsDaily, timestampsHourly } = createDatetimeArray(
    eventDate,
    daysBefore,
    includeAfter
  )

  const idPercent = await getPercentPerGrid(fieldId)

  const gridDataComplete = [] as any

  for (const grid of idPercent) {
    const radolanDataPerGrid = await getRadolanDataByGridId(
      grid.gridId,
      startDateString,
      endDateString
    )

    const radolan = radolanDataPerGrid.response.data

    let sum = 0
    radolan.forEach((element) => {
      sum += element.value
    })

    const radolanHourlyValuesArray = createRadolanHourlyValuesArray(
      radolan,
      timestampsHourly
    )
    const radolanDailyValuesArray = createRadolanDailyValuesArray(
      radolanHourlyValuesArray
    )

    const gridData = {
      gridId: grid.gridId,
      percent: grid.percent,
      complete: sum,
      daily: radolanDailyValuesArray,
      hourly: radolanHourlyValuesArray
    }
    gridDataComplete.push(gridData)
  }

  const fieldDaily = [] as any
  const fieldHourly = [] as any

  let fieldComplete = 0

  if (after) {
    daysBefore += daysBefore
  }

  for (let i = 0; i < daysBefore; i++) {
    fieldDaily.push(0)
    for (let x = 0; x < 24; x++) {
      fieldHourly.push(0)
    }
  }

  for (const grid of gridDataComplete) {
    const percent = grid.percent / 100
    fieldComplete += round(percent * grid.complete, 1)

    const gridDailyWeighted = [] as any
    for (const day of grid.daily) {
      gridDailyWeighted.push(percent * day)
    }

    gridDailyWeighted.forEach((value, index) => {
      fieldDaily[index] += round(value, 4)
    })

    const gridHourlyWeighted = [] as any
    for (const hour of grid.hourly) {
      gridHourlyWeighted.push(percent * hour)
    }

    gridHourlyWeighted.forEach((value, index) => {
      fieldHourly[index] += round(value, 1)
    })
  }

  const response = {
    fieldId: fieldId,
    complete: fieldComplete,
    timestampsDaily: timestampsDaily,
    timestampsHourly: timestampsHourly,
    radolanDaily: fieldDaily,
    radolanHourly: fieldHourly
  }

  return response
}
