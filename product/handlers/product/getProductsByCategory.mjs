import { ScanCommand } from "@aws-sdk/lib-dynamodb";

export default async function getProductsByCategory(taxonomyId, dynamodb) {
  try {
    const params = {
      TableName: "Products",
      // Optional parameters
      FilterExpression: "#category = :category", // Optional: filter the results
      ExpressionAttributeValues: {
        ":category": taxonomyId, // Value for the filter expression
      },
      ExpressionAttributeNames: {
        "#category": "category",
      },
      Limit: 50, // Optional: limit the number of items per scan
    };
    let lastEvaluatedKey = undefined;
    const items = [];

    do {
      // If there's a lastEvaluatedKey, add it to the params
      if (lastEvaluatedKey) {
        params.ExclusiveStartKey = lastEvaluatedKey;
      }

      const command = new ScanCommand(params);
      const response = await dynamodb.send(command);

      // Add the items from this scan to our array
      items.push(...response.Items);

      // Get the last evaluated key for pagination
      lastEvaluatedKey = response.LastEvaluatedKey;
    } while (lastEvaluatedKey); // Continue if there are more items

    console.log("Scan completed. Total items:", items.length);
    return items;
  } catch (err) {
    throw err;
  }
}
