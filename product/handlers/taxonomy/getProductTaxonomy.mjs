import { GetCommand } from "@aws-sdk/lib-dynamodb";

export default async function getProductTaxonomy(id, dynamodb) {
  console.log(id);
  try {
    const params = {
      TableName: "ProductTaxonomyAttributes",
      Key: {
        TaxonomyId: id,
      },
    };
    const command = new GetCommand(params);
    const response = await dynamodb.send(command);
    console.log("response: ", response);
    return response.Item;
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: err,
    };
  }
}
