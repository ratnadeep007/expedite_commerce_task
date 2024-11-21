import { GetCommand } from "@aws-sdk/lib-dynamodb";

export default async function getProduct(id, dynamodb) {
  console.log(id);
  try {
    const params = {
      TableName: "Products",
      Key: {
        ProductId: id,
      },
    };
    const command = new GetCommand(params);
    const response = await dynamodb.send(command);
    console.log("response: ", response);
    console.log("keys", Object.keys(response));
    return response.Item;
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: err,
    };
  }
}
