function round(value, precision = 0) {
  const multiplier = Math.pow(10, precision)
  return Math.round(value * multiplier) / multiplier
}

export function createRadolanHourlyValuesArray(
  radolanValuesArray,
  datetimeArray
) {
  // eslint-disable-next-line
  const radolanHourlyValuesArray = [] as any
  // eslint-disable-next-line
  const datetimesSplit = [] as any
  datetimeArray.forEach((timestamp) => {
    datetimesSplit.push(timestamp.split(":")[0])
  })

  for (const i of radolanValuesArray) {
    i.time = i.time.split(":")[0]
  }

  datetimesSplit.forEach((element) => {
    radolanHourlyValuesArray.push(0)
    for (const i of radolanValuesArray) {
      if (i.time == element) {
        radolanHourlyValuesArray.pop()
        radolanHourlyValuesArray.push((round((i.value / 10), 1)))
      }
    }
  })

  return radolanHourlyValuesArray
}
