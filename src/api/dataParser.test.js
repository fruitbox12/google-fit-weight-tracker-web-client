import { extractWeightPoints, findDataSource } from './dataParser'

const sampleWeightData = {
  "bucket": [
    {
      "startTimeMillis": "1564401890452",
      "endTimeMillis": "1564405490452",
      "dataset": [
        {
          "dataSourceId": "derived:com.google.weight.summary:com.google.android.gms:aggregated",
          "point": [
            {
              "startTimeNanos": "1564402987297000000",
              "endTimeNanos": "1564403112028000000",
              "dataTypeName": "com.google.weight.summary",
              "originDataSourceId": "raw:com.google.weight:117622503236:web:123456:90cx0v87xc90vz7cxv897zxv9",
              "value": [
                {
                  "fpVal": 50.0,
                  "mapVal": []
                },
                {
                  "fpVal": 50.0,
                  "mapVal": []
                },
                {
                  "fpVal": 50.0,
                  "mapVal": []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "startTimeMillis": "1564405490452",
      "endTimeMillis": "1564409090452",
      "dataset": [
        {
          "dataSourceId": "derived:com.google.weight.summary:com.google.android.gms:aggregated",
          "point": []
        }
      ]
    },
    {
      "startTimeMillis": "1564409090452",
      "endTimeMillis": "1564412690452",
      "dataset": [
        {
          "dataSourceId": "derived:com.google.weight.summary:com.google.android.gms:aggregated",
          "point": []
        }
      ]
    },
    {
      "startTimeMillis": "1564412690452",
      "endTimeMillis": "1564416290452",
      "dataset": [
        {
          "dataSourceId": "derived:com.google.weight.summary:com.google.android.gms:aggregated",
          "point": []
        }
      ]
    },
    {
      "startTimeMillis": "1564416290452",
      "endTimeMillis": "1564419890452",
      "dataset": [
        {
          "dataSourceId": "derived:com.google.weight.summary:com.google.android.gms:aggregated",
          "point": []
        }
      ]
    },
    {
      "startTimeMillis": "1564419890452",
      "endTimeMillis": "1564423490452",
      "dataset": [
        {
          "dataSourceId": "derived:com.google.weight.summary:com.google.android.gms:aggregated",
          "point": []
        }
      ]
    },
    {
      "startTimeMillis": "1564423490452",
      "endTimeMillis": "1564427090452",
      "dataset": [
        {
          "dataSourceId": "derived:com.google.weight.summary:com.google.android.gms:aggregated",
          "point": []
        }
      ]
    },
    {
      "startTimeMillis": "1564427090452",
      "endTimeMillis": "1564430690452",
      "dataset": [
        {
          "dataSourceId": "derived:com.google.weight.summary:com.google.android.gms:aggregated",
          "point": []
        }
      ]
    },
    {
      "startTimeMillis": "1564430690452",
      "endTimeMillis": "1564434290452",
      "dataset": [
        {
          "dataSourceId": "derived:com.google.weight.summary:com.google.android.gms:aggregated",
          "point": [
            {
              "startTimeNanos": "1564433808439000000",
              "endTimeNanos": "1564433854058000000",
              "dataTypeName": "com.google.weight.summary",
              "originDataSourceId": "raw:com.google.weight:117622503236:web:123456:90cx0v87xc90vz7cxv897zxv9",
              "value": [
                {
                  "fpVal": 103.41788509173809,
                  "mapVal": []
                },
                {
                  "fpVal": 110.0,
                  "mapVal": []
                },
                {
                  "fpVal": 100.0,
                  "mapVal": []
                }
              ]
            }
          ]
        }
      ]
    },
  ]
}

const sampleDataSourcesData = {
  "dataSource": [
    {
      "dataStreamId": "derived:com.google.weight:com.google.android.gms:merge_weight",
      "dataStreamName": "merge_weight",
      "type": "derived",
      "dataType": {
        "name": "com.google.weight",
        "field": [
          {
            "name": "weight",
            "format": "floatPoint"
          }
        ]
      },
      "application": {
        "packageName": "com.google.android.gms"
      },
      "dataQualityStandard": []
    },
    {
      "dataStreamId": "raw:com.google.weight:117622503236:web:123456:90cx0v87xc90vz7cxv897zxv9",
      "type": "raw",
      "dataType": {
        "name": "com.google.weight",
        "field": [
          {
            "name": "weight",
            "format": "floatPoint"
          }
        ]
      },
      "device": {
        "uid": "90cx0v87xc90vz7cxv897zxv9",
        "type": "phone",
        "version": "1.0.0",
        "model": "123456",
        "manufacturer": "web"
      },
      "application": {
        "name": "indus-health"
      },
      "dataQualityStandard": []
    }
  ]
}

describe('Data Parser', () => {
  describe('extractWeightPoints', () => {

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
      expect(extractWeightPoints(sampleWeightData)).toEqual([
        {
          "time": "1564405490452",
          "value": 50,
        },
        {
          "time": "1564409090452",
          "value": undefined,
        },
        {
          "time": "1564412690452",
          "value": undefined,
        },
        {
          "time": "1564416290452",
          "value": undefined,
        },
        {
          "time": "1564419890452",
          "value": undefined,
        },
        {
          "time": "1564423490452",
          "value": undefined,
        },
        {
          "time": "1564427090452",
          "value": undefined,
        },
        {
          "time": "1564430690452",
          "value": undefined,
        },
        {
          "time": "1564434290452",
          "value": 103.41788509173809,
        },
      ])
    })
  })

  describe('findDataSource', () => {
    expect(findDataSource(sampleDataSourcesData)).toEqual({
      "dataStreamId": "raw:com.google.weight:117622503236:web:123456:90cx0v87xc90vz7cxv897zxv9",
      "type": "raw",
      "dataType": {
        "name": "com.google.weight",
        "field": [
          {
            "name": "weight",
            "format": "floatPoint"
          }
        ]
      },
      "device": {
        "uid": "90cx0v87xc90vz7cxv897zxv9",
        "type": "phone",
        "version": "1.0.0",
        "model": "123456",
        "manufacturer": "web"
      },
      "application": {
        "name": "indus-health"
      },
      "dataQualityStandard": []
    })
  })
})
