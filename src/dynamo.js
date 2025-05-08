import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ID,
  },
});
const docClient = DynamoDBDocumentClient.from(client);

export async function scanTodo() {
  const { Items } = await docClient.send(
    new ScanCommand({ TableName: "todo" })
  );
  return Items || [];
}

export async function createToDo(item) {
  await docClient.send(new PutCommand({ TableName: "todo", Item: item }));
}
