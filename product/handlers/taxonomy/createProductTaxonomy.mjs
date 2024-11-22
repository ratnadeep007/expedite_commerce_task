import { randomUUID } from "crypto";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

export default async function createProductTaxonomy(productTaxonomy, dynamodb) {
  const id = randomUUID();
  if (!productTaxonomy.parentId) {
    productTaxonomy.parentId = "root";
  }
  try {
    const params = {
      TableName: "ProductTaxonomyAttributes",
      Item: {
        taxonomyId: id,
        ...productTaxonomy,
        createdAt: new Date().toISOString(),
      },
      ReturnValue: "ALL_OLD",
    };
    console.log(params);
    const command = new PutCommand(params);
    await dynamodb.send(command);
    console.log("Insert successful");
    return {
      id,
    };
  } catch (err) {
    throw err;
  }
}
