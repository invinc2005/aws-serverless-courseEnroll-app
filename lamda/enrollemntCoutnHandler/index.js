const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "eu-north-1" });

exports.handler = async () => {
  try {
    const command = new ScanCommand({
      TableName: "Enrollments"
    });

    const result = await client.send(command);

    const enrollments = result.Items.map(item => ({
      email: item.email.S,
      courseId: item.courseId.S
    }));

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(enrollments)
    };

  } catch (err) {
    console.error("Error fetching enrollments:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to fetch enrollments" })
    };
  }
};
