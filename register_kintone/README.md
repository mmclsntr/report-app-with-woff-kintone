# Backend

## Deploy to Lambda
reference: https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/nodejs-package.html

### Install

```sh
npm install
```

### Create zip file

```sh
zip -r function.zip .
```

### Upload to Lambda function
Upload the zip file to AWS Lambda function via Console or API.

### Set environment
Environment variables for kintone access

|key|description|
|---|---|
|KINTONE_BASE_URL| Base URL (e.g. `https://xxxxxxx.cybozu.com/`) |
|KINTONE_APP_ID|kintone App ID (e.g. 1)|
|KINTONE_API_KEY| API key of kintone App https://jp.cybozu.help/k/ja/user/app_settings/api_token.html |

### Set Lambda function URL
Create Lambda function URL.

And, configue Cross-origin resource sharing (CORS).

- AllowOrigins: *
- AllowMethods: POST
- AllowHeaders: content-type
