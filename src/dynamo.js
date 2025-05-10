import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient,PutCommand, ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ID,
  },
});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE = "todo"
export async function scanTodo() {
  const { Items } = await docClient.send(
    new ScanCommand({ TableName: "todo" })
  );
  return Items || [];
}

export async function createToDo(item) {
  await docClient.send(new PutCommand({ TableName: "todo", Item: item }));
}

export async function deleteTodo(id) {
  await docClient.send(new DeleteCommand({ TableName: "todo", Key: {id} }));

}
export async function toggleDone(id, completed) {
  await docClient.send(new UpdateCommand({
    TableName: "todo", 
    Key: {id},
    UpdateExpression: "SET #done = :val",
    ExpressionAttributeNames: {"#done": "completed"},
    ExpressionAttributeValues: {":val": completed },
  }),
);
}

