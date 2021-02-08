export function createRadolanDailyValuesArray(radolanHourlyValuesArray) {
  // eslint-disable-next-line
  const radolanDailyValuesArray = [] as any

  for (let i = 0; i < radolanHourlyValuesArray.length / 24; i++) {
    let sumDaily = 0
    for (let j = 0; j < 24; j++) {
      sumDaily += radolanHourlyValuesArray[i * 24 + j]
    }
    radolanDailyValuesArray.push(sumDaily)
  }

  return radolanDailyValuesArray
}
