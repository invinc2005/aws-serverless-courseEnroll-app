const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const bcrypt = require("bcryptjs");

const client = new DynamoDBClient({ region: "eu-north-1" });

exports.handler = async () => {
  const email = "admin@example.com";
  const password = "admin123"; // Change this before deployment

  const hashed = await bcrypt.hash(password, 10);

  const input = {
    TableName: "Admins",
    Item: {
      email: { S: email },
      passwordHash: { S: hashed }
    }
  };

  try {
    await client.send(new PutItemCommand(input));
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: "Admin created successfully" })
    };
  } catch (err) {
    console.error("Error creating admin:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to create admin" })
    };
  }
};
