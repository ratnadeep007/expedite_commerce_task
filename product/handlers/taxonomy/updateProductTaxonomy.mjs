import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

function generateCommandParams(id, productTaxonomy) {
  console.log(id);
  return {
    TableName: "ProductTaxonomyAttributes",
    Key: {
      taxonomyId: id,
    },
    UpdateExpression:
      "SET #name = :name, #description = :description, #parentId = :parentId, #type = :type, #updatedAt = :timestamp",
    ExpressionAttributeNames: {
      "#name": "name",
      "#description": "description",
      "#parentId": "parentId",
      "#type": "type",
      "#updatedAt": "updatedAt",
    },
    ExpressionAttributeValues: {
      ":name": productTaxonomy.name,
      ":description": productTaxonomy.description,
      ":parentId": productTaxonomy.parentId ?? "root",
      ":type": productTaxonomy.type,
      ":timestamp": new Date().toISOString(),
    },
    ReturnValues: "ALL_NEW",
  };
}

export default async function updateProductTaxonomy(
  id,
  productTaxonomy,
  dynamodb,
) {
  try {
    console.log(productTaxonomy);
    console.log("id: " + id);
    const params = generateCommandParams(id, productTaxonomy);
    const command = new UpdateCommand(params);
    const response = await dynamodb.send(command);
    console.log("Update successful");
    return response.Attributes;
  } catch (err) {
    throw err;
  }
}
