import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

function generateCommandParams(id, productTaxonomy) {
  console.log(id);
  return {
    TableName: "ProductTaxonomyAttributes",
    Key: {
      TaxonomyId: id,
    },
    UpdateExpression:
      "SET #name = :name, #description = :description, #parentId = :parentId, #type = :type, #updatedAt = :timestamp",
    ExpressionAttributeNames: {
      "#name": "Name",
      "#description": "Description",
      "#parentId": "ParentId",
      "#type": "Type",
      "#updatedAt": "UpdatedAt",
    },
    ExpressionAttributeValues: {
      ":name": productTaxonomy.Name,
      ":description": productTaxonomy.Description,
      ":parentId": productTaxonomy.ParentId ?? "root",
      ":type": productTaxonomy.Type,
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
    console.log(err);
    return {
      statusCode: 500,
      body: err,
    };
  }
}
