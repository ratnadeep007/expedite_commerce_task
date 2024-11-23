import { GetCommand } from "@aws-sdk/lib-dynamodb";

export default async function getProduct(id, dynamodb) {
  console.log(id);
  try {
    const paramsProduct = {
      TableName: "Products",
      Key: {
        productId: id,
      },
    };
    const commandProduct = new GetCommand(paramsProduct);
    const { Item: product } = await dynamodb.send(commandProduct);

    if (!product) {
      throw new Error(`Product with ProductId ${id} not found`);
    }

    console.log("response: ", product);

    const paramsTaxonomy = {
      TableName: "ProductTaxonomyAttributes",
      Key: {
        taxonomyId: product.category,
      },
    };
    const commandTaxonomy = new GetCommand(paramsTaxonomy);
    const { Item: category } = await dynamodb.send(commandTaxonomy);

    if (!category) {
      throw new Error(`Category for product ${product.name} not found`);
    }

    console.log("response: ", category);
    return {
      ...product,
      category: category,
    };
  } catch (err) {
    throw err;
  }
}
