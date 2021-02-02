export function createStartEndDateString(
  numberOfDays: number,
  date1: boolean = false,
  date2: boolean = false
) {
  let startDate = new Date()
  let endDate = new Date()

  let startDateString = ""
  let endDateString = ""

  if (date1 === false && date2 === false) {
    endDate.setDate(endDate.getDate() - 1)
    endDateString = endDate.toISOString().split("T")[0]

    startDate.setDate(startDate.getDate() - numberOfDays)
    startDateString = startDate.toISOString().split("T")[0]
  }

  return {
    startDateString: startDateString,
    endDateString: endDateString
  }
}
