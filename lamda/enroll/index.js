const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "eu-north-1" });

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { email, courseId } = body;

    if (!email || !courseId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing email or courseId" })
      };
    }

    const input = {
      TableName: "Enrollments",
      Item: {
        email: { S: email },
        courseId: { S: courseId }
      }
    };

    const command = new PutItemCommand(input);
    await client.send(command);

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: "Enrollment successful" })
    };

  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" })
    };
  }
};
