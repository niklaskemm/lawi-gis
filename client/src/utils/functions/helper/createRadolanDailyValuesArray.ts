export function createRadolanDailyValuesArray(radolanHourlyValuesArray) {
  // eslint-disable-next-line
  const radolanDailyValuesArray = [] as any

  for (let i = 0; i < radolanHourlyValuesArray.length / 24; i++) {
    let sum = 0
    for (let j = 0; j < 24; j++) {
      sum += radolanHourlyValuesArray[i * 24 + j]
    }
    radolanDailyValuesArray.push(sum)
  }

  return radolanDailyValuesArray
}
