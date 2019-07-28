

export const extractWeightPoints = (rawData) => {
  return rawData.bucket[0].dataset[0].point.map(rawDataPoint => ({
    time: rawDataPoint.endTimeNanos / 1000,
    value: rawDataPoint.value[0].fpVal
  }))
}