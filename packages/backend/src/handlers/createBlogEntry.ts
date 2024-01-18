import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyHandler } from "aws-lambda";

const client = new DynamoDBClient({ region: "eu-west-2" });

export const handler: APIGatewayProxyHandler = async (event) => {

    const body = event.body;
    if (!body) throw new Error("Missing body argument");

    const { id, title, description } = JSON.parse(body);
    const params = {
        TableName: "BlogEntries",
        Item: {
            id: { S: id },
            title: { S: title },
            description: { S: description }
        }
    };

    try {
        await client.send(new PutItemCommand(params));
        return { statusCode: 200, body: JSON.stringify({ message: "Blog entry created" }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: "Could not create blog entry" }) };
    }
};
