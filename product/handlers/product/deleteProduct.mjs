import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

export default async function deleteProduct(id, dynamodb) {
  try {
    const params = {
      TableName: "Products",
      Key: {
        productId: id,
      },
    };
    const command = new DeleteCommand(params);
    await dynamodb.send(command);
    return {
      id,
    };
  } catch (err) {
    throw err;
  }
}
