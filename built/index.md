FORMAT: 1A

# Test Document

# Data Structure

## Group Test

### Sample [/api/sample/]

#### List [GET]

Sample of list

- Response 200 (application/json)
  {
    "list|Nullable": [
      {
        "id": "Number:1-4",
        "name": "String:10-20",
        "number|Nullable": "Number:0-3",
        "date": "Date|ISO",
        "numberRange": "NumberRange:1970-1989",
        "randomValue": "RandomValue|foo,bar,buz",
        "randomArray": "RandomArray|foo,bar,buz"
      }
    , "0-2"]
  }
