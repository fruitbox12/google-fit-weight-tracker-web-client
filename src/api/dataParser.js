

export const extractWeightPoints = (rawData) => {
  if (!rawData) return []
  if (!rawData.bucket) return []
  if (!rawData.bucket[0]) return []
  if (!rawData.bucket[0].dataset) return []
  if (!rawData.bucket[0].dataset[0]) return []
  if (!rawData.bucket[0].dataset[0].point) return []

  return rawData.bucket.map(rawDataPoint => ({
    time: rawDataPoint.endTimeMillis,
    value: rawDataPoint.dataset[0].point[0] && rawDataPoint.dataset[0].point[0].value[0].fpVal
  }))
}

export const findDataSource = (rawData) => {
  // Hacky way of getting a user's datastreamID.
  return rawData.dataSource.find(dataSource => dataSource.device && dataSource.device.uid === '90cx0v87xc90vz7cxv897zxv9')
}