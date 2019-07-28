import { extractWeightPoints } from './dataParser'

const sampleData = {
  "bucket": [
    {
      "startTimeMillis": "1563668401135",
      "endTimeMillis": "1564273201135",
      "dataset": [
        {
          "dataSourceId": "derived:com.google.weight:com.google.android.gms:merge_weight",
          "point": [
            {
              "startTimeNanos": "1563985967583000000",
              "endTimeNanos": "1563985967583000000",
              "dataTypeName": "com.google.weight",
              "originDataSourceId": "raw:com.google.weight:com.google.android.apps.fitness:user_input",
              "value": [
                {
                  "fpVal": 86.63607025146484,
                  "mapVal": []
                }
              ]
            },
            {
              "startTimeNanos": "1564273115294000000",
              "endTimeNanos": "1564273115294000000",
              "dataTypeName": "com.google.weight",
              "originDataSourceId": "raw:com.google.weight:com.google.android.apps.fitness:user_input",
              "value": [
                {
                  "fpVal": 90.5369644165039,
                  "mapVal": []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

describe('Data Parse', () => {
  it('should return empty array if no data', () => {
    expect(extractWeightPoints({
      "bucket": [
        {
          "startTimeMillis": "1563668401135",
          "endTimeMillis": "1564273201135",
          "dataset": [
          ]
        }
      ]
    })).toEqual([])
  })

  it('can parse out google fit weight data', () => {
    expect(extractWeightPoints(sampleData)).toEqual([{
      time: 1563985967583000,
      value: 86.63607025146484,
    },
    {
      "time": 1564273115294000.2,
      "value": 90.5369644165039,
    }
    ])
  })
})
