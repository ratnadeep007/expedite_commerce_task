import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

function generateCommandParams(id, product) {
  return {
    TableName: "Products",
    Key: {
      ProductId: id,
    },
    UpdateExpression:
      "SET #name = :name, #description = :description, #category = :category, #stock = :stock, #price = :price, #updatedAt = :timestamp",
    ExpressionAttributeNames: {
      "#name": "Name",
      "#description": "Description",
      "#price": "Price",
      "#stock": "Stock",
      "#category": "Category",
      "#updatedAt": "UpdatedAt",
    },
    ExpressionAttributeValues: {
      ":name": product.Name,
      ":description": product.Description,
      ":price": product.Price,
      ":category": product.Category,
      ":stock": product.Stock,
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
    return {
      statusCode: 500,
      body: err,
    };
  }
}
