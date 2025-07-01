const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "eu-north-1" });

exports.handler = async (event) => {
  const email = event.pathParameters?.email;

  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing email in path" })
    };
  }

  const input = {
    TableName: "Enrollments",
    KeyConditionExpression: "email = :e",
    ExpressionAttributeValues: {
      ":e": { S: email }
    }
  };

  try {
    const command = new QueryCommand(input);
    const response = await client.send(command);

    const courses = response.Items.map(item => ({
      courseId: item.courseId.S
    }));

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(courses)
    };

  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error retrieving enrollments" })
    };
  }
};
