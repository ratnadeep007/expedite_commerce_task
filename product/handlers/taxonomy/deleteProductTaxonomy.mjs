import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

export default async function deleteProductTaxonomy(id, dynamodb) {
  try {
    const params = {
      TableName: "ProductTaxonomyAttributes",
      Key: {
        TaxonomyId: id,
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
