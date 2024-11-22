import { GetCommand } from "@aws-sdk/lib-dynamodb";

export default async function getProductTaxonomy(id, dynamodb) {
  console.log(id);
  try {
    const params = {
      TableName: "ProductTaxonomyAttributes",
      Key: {
        taxonomyId: id,
      },
    };
    const command = new GetCommand(params);
    const response = await dynamodb.send(command);
    console.log("response: ", response);
    if (!response.Item) {
      throw new Error("Product Taxonomy not found");
    }
    return response.Item;
  } catch (err) {
    throw err;
  }
}
