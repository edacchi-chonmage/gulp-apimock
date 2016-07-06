FORMAT: 1A

# CRS APIドキュメント

# Data Structure

## Group TKR

### 求人一覧 [/api/tr/jobs/{?hoge}]

#### 求人一覧 [GET]

リクルーターにひもづく求人を一覧で取得

- Response 200 (application/json)
  {
    "messages": null,
    "mode": "SUCCESS",
    "resultMap": {
      "jobs|1-10": [
        {
          "jobId": "Number:1-4",
          "jobName": "String:4-8",
          "matchCount": "Number:1",
          "lastViewedAt": "Date|ISO"
        }
      ]
    }
  }
