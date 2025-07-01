const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "eu-north-1" });

exports.handler = async (event) => {
  const courseId = event.queryStringParameters?.courseId;

  if (!courseId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing courseId in query parameters" })
    };
  }

  const input = {
    TableName: "Courses",
    Key: {
      courseId: { S: courseId }
    }
  };

  try {
    const command = new GetItemCommand(input);
    const response = await client.send(command);

    if (!response.Item) {
      return {
        statusCode: 404,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ message: "Course not found" })
      };
    }

    const item = {
      courseId: response.Item.courseId.S,
      title: response.Item.title.S,
      description: response.Item.description.S,
      durationHours: Number(response.Item.durationHours.N),
      instructorName: response.Item.instructorName.S
    };

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(item)
    };

  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" })
    };
  }
};
