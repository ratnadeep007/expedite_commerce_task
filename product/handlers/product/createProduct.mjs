import { randomUUID } from "crypto";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import getProductTaxonomy from "../taxonomy/getProductTaxonomy.mjs";

export default async function createProduct(product, dynamodb) {
  const id = randomUUID();
  try {
    const params = {
      TableName: "Products",
      Item: {
        productId: id,
        ...product,
        createdAt: new Date().toISOString(),
      },
    };
    console.log(params);
    const command = new PutCommand(params);
    await dynamodb.send(command);
    return {
      id,
    };
  } catch (err) {
    throw err;
  }
}
