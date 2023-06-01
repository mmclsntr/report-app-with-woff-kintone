import { KintoneRestAPIClient } from '@kintone/rest-api-client'

export async function handler(event, context) {
    console.log(event)
    const body = JSON.parse(event.body);
    console.log(body)

    const apiKey = process.env.KINTONE_API_KEY
    const appId = process.env.KINTONE_APP_ID
    const baseUrl = process.env.KINTONE_BASE_URL

    const client = new KintoneRestAPIClient({
        baseUrl: baseUrl,
        auth: {
            apiToken: apiKey
        }
    });

    let rec = {
        "userId": {
            value: body.userId
        },
        "place": {
            value: body.place
        },
        "date": {
            type: "DATE",
            value: body.date
        },
        "startTime": {
            type: "TIME",
            value: body.startTime
        },
        "endTime": {
            type: "TIME",
            value: body.endTime
        }
    }

    console.log(rec)

    let reqBody = { app: appId, record: rec }
    console.log(JSON.stringify(reqBody))
    const res = await client.record.addRecord({ app: appId, record: rec });
    console.log(res)

    return {
        statusCode: 200,
        body: JSON.stringify(res)
    }
}
