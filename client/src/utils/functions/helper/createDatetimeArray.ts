export function createDatetimeArray(
  date: Date = new Date(),
  daysBefore: number = 14,
  includeAfter: boolean = false
) {
  // eslint-disable-next-line
  const timestampsHourly = [] as any

  const eventDate = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  )

  const startDate = new Date(
    eventDate.setDate(eventDate.getUTCDate() - daysBefore)
  )

  // const endDate = new Date(eventDate.setDate(eventDate.getUTCDate() + daysBefore));
  let startDateWithHours = new Date(startDate.setHours(0))
  let i = 0
  let hours = daysBefore * 24

  if (includeAfter) {
    hours = hours * 2
  }

  while (i < hours) {
    startDateWithHours = new Date(
      startDateWithHours.setHours(startDateWithHours.getHours() + 1)
    )
    timestampsHourly.push(startDateWithHours.toISOString())
    i += 1
  }

  const numberOfDays = hours / 24
  // eslint-disable-next-line
  const timestampsDaily = [] as any
  for (let i = 0; i < numberOfDays; i++) {
    timestampsDaily.push(timestampsHourly[i * 24].split("T")[0])
  }

  return { timestampsHourly, timestampsDaily }
}
