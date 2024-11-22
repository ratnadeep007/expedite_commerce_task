import { GetCommand } from "@aws-sdk/lib-dynamodb";

export default async function getProduct(id, dynamodb) {
  console.log(id);
  try {
    const paramsProduct = {
      TableName: "Products",
      Key: {
        ProductId: id,
      },
    };
    const commandProduct = new GetCommand(paramsProduct);
    const { Item: product } = await dynamodb.send(commandProduct);

    console.log("response: ", product);

    const paramsTaxonomy = {
      TableName: "ProductTaxonomyAttributes",
      Key: {
        TaxonomyId: product.Category,
      },
    };
    const commandTaxonomy = new GetCommand(paramsTaxonomy);
    const { Item: category } = await dynamodb.send(commandTaxonomy);

    console.log("response: ", category);
    return {
      ...product,
      Category: category,
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: err,
    };
  }
}
