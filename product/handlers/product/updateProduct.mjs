import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

function generateCommandParams(id, product) {
  return {
    TableName: "Products",
    Key: {
      productId: id,
    },
    UpdateExpression:
      "SET #name = :name, #description = :description, #category = :category, #stock = :stock, #price = :price, #updatedAt = :timestamp",
    ExpressionAttributeNames: {
      "#name": "name",
      "#description": "description",
      "#price": "price",
      "#stock": "stock",
      "#category": "category",
      "#updatedAt": "updatedAt",
    },
    ExpressionAttributeValues: {
      ":name": product.name,
      ":description": product.description,
      ":price": product.price,
      ":category": product.category,
      ":stock": product.stock,
      ":timestamp": new Date().toISOString(),
    },
    ReturnValues: "ALL_NEW",
  };
}

export default async function updateProduct(id, product, dynamodb) {
  try {
    const params = generateCommandParams(id, product);
    const command = new UpdateCommand(params);
    const response = await dynamodb.send(command);
    console.log("Update successful", response);
    return response.Attributes;
  } catch (err) {
    throw err;
  }
}
