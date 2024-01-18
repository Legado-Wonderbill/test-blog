import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyHandler } from "aws-lambda";
import {sendResponse} from "./sendResponse";

// Utility function to convert DynamoDB item to normal object
const convertDynamoDBItemToObject = (item: any) => {
    let obj: any = {};
    for (let key in item) {
        obj[key] = item[key].S; // Assuming all values are strings. You might need to handle other data types as well.
    }
    return obj;
};

const client = new DynamoDBClient({ region: "eu-west-2" });

export const handler: APIGatewayProxyHandler = async () => {
    const params = {
        TableName: "BlogEntries",
    };

    try {
        const data = await client.send(new ScanCommand(params));
        const entries = data.Items?.map(convertDynamoDBItemToObject);
        return sendResponse(200, {entries});
    } catch (error) {
        return sendResponse(500,{ message: (error as Error).message });
    }
};
