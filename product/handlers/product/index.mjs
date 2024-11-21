import createProduct from "./createProduct.mjs";
import getProduct from "./getProduct.mjs";
import updateProduct from "./updateProduct.mjs";
import deleteProduct from "./deleteProduct.mjs";

export default async function handleProduct(event, dynamodb) {
  let product = event.arguments;
  let id = event.arguments.ProductId;
  switch (event.action) {
    case "addProduct":
      return await createProduct(product, dynamodb);
    case "getProduct":
      return await getProduct(id, dynamodb);
    case "updateProduct":
      return await updateProduct(id, product, dynamodb);
    case "deleteProduct":
      return await deleteProduct(id, dynamodb);
    default:
      throw new Error("Unkown action, unable to resolve: " + event.action);
  }
}
