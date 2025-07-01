// unenrollHandler.js
const { DynamoDBClient, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({ region: "eu-north-1" });

exports.handler = async (event) => {
  const { email, courseId } = event.queryStringParameters;

  if (!email || !courseId) {
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: "Missing email or courseId" }),
    };
  }

  try {
    await client.send(new DeleteItemCommand({
      TableName: "Enrollments",
      Key: {
        email: { S: email },
        courseId: { S: courseId }
      }
    }));

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: "Unenrolled successfully" }),
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: "Failed to unenroll" }),
    };
  }
};
