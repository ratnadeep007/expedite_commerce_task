import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

export default async function deleteProductTaxonomy(id, dynamodb) {
  try {
    const params = {
      TableName: "ProductTaxonomyAttributes",
      Key: {
        taxonomyId: id,
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
