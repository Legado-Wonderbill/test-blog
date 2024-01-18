import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyHandler } from "aws-lambda";

const client = new DynamoDBClient({ region: "eu-west-2" });

export const handler: APIGatewayProxyHandler = async () => {
    const params = {
        TableName: "BlogEntries",
    };

    try {
        const data = await client.send(new ScanCommand(params));
        return { statusCode: 200, body: JSON.stringify({ entries: data.Items }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: "Could not retrieve blog entries" }) };
    }
};
