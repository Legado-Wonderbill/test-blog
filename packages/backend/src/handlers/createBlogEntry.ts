import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyHandler } from "aws-lambda";
import {sendResponse} from "./sendResponse";

const client = new DynamoDBClient({ region: "eu-west-2" });

export const handler: APIGatewayProxyHandler = async (event) => {
    try {

    const body = event.body;
    if (!body) throw new Error("Missing body argument");

    const { id, title, description } = JSON.parse(body);
    if(!id || !title || !description) throw new Error("Missing required fields");
    
    const params = {
        TableName: "BlogEntries",
        Item: {
            id: { S: id },
            title: { S: title },
            description: { S: description }
        }
    };

        await client.send(new PutItemCommand(params));
        return sendResponse(200, {message: "Blog entry created"});
    } catch (error) {
        return sendResponse(500,{ message: (error as Error).message });
    }
};
