export function createRadolanDailyValuesArray(radolanHourlyValuesArray) {
  // eslint-disable-next-line
  const radolanDailyValuesArray = [] as any

  function round(value, precision = 0) {
    const multiplier = Math.pow(10, precision)
    return Math.round(value * multiplier) / multiplier
  }

  for (let i = 0; i < radolanHourlyValuesArray.length / 24; i++) {
    let sumDaily = 0
    for (let j = 0; j < 24; j++) {
      sumDaily += radolanHourlyValuesArray[i * 24 + j]
    }
    radolanDailyValuesArray.push(round(sumDaily, 1))
  }
  return radolanDailyValuesArray
}
