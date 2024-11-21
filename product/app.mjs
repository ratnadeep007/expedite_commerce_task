import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import handleProduct from "./handlers/product/index.mjs";
import handleProductTaxonomy from "./handlers/taxonomy/index.mjs";

const dynamoDBClient = new DynamoDBClient({ region: "us-east-1" });

export const lambdaHandler = async (event, _) => {
  // console.log(`EVENT: ${JSON.stringify(event, 2)}`);

  // const name = !event.arguments?.name ? "world" : event.arguments.name;

  console.log("Invoking for", event);
  if (event.action.includes("ProductTaxonomy")) {
    return await handleProductTaxonomy(event, dynamoDBClient);
  } else if (event.action.includes("Product")) {
    return await handleProduct(event, dynamoDBClient);
  } else {
    throw new Error("Unkown action: " + event.action);
  }
};
