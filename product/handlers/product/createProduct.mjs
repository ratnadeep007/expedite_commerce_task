import { randomUUID } from "crypto";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

export default async function createProduct(product, dynamodb) {
  const id = randomUUID();
  try {
    const params = {
      TableName: "Products",
      Item: {
        ProductId: id,
        ...product,
        CreatedAt: new Date().toISOString(),
      },
    };
    console.log(params);
    const command = new PutCommand(params);
    await dynamodb.send(command);
    return {
      Id: id,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
}
