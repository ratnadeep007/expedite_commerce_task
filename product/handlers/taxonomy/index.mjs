import createProductTaxonomy from "./createProductTaxonomy.mjs";
import deleteProductTaxonomy from "./deleteProductTaxonomy.mjs";
import getProductTaxonomy from "./getProductTaxonomy.mjs";
import updateProductTaxonomy from "./updateProductTaxonomy.mjs";

export default async function handleProductTaxonomy(event, dynamodb) {
  let taxonomy = event.arguments;
  let id = event.arguments.TaxonomyId;
  switch (event.action) {
    case "addProductTaxonomy":
      return await createProductTaxonomy(taxonomy, dynamodb);
    case "getProductTaxonomy":
      return await getProductTaxonomy(id, dynamodb);
    case "updateProductTaxonomy":
      return updateProductTaxonomy(id, taxonomy, dynamodb);
    case "deleteProductTaxonomy":
      return deleteProductTaxonomy(id, dynamodb);
    default:
      throw new Error("Unkown action, unable to resolve: " + event.action);
  }
}
