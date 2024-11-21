import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

export default async function deleteProduct(id, dynamodb) {
  try {
    const params = {
      TableName: "Products",
      Key: {
        ProductId: id,
      },
    };
    const command = new DeleteCommand(params);
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
