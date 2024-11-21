import { randomUUID } from "crypto";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

export default async function createProductTaxonomy(productTaxonomy, dynamodb) {
  const id = randomUUID();
  if (!productTaxonomy.ParentId) {
    productTaxonomy.ParentId = "root";
  }
  try {
    const params = {
      TableName: "ProductTaxonomyAttributes",
      Item: {
        TaxonomyId: id,
        ...productTaxonomy,
        CreatedAt: new Date().toISOString(),
      },
      ReturnValue: "ALL_OLD",
    };
    console.log(params);
    const command = new PutCommand(params);
    await dynamodb.send(command);
    console.log("Insert successful");
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
