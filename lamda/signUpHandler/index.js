const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const bcrypt = require("bcryptjs");

const client = new DynamoDBClient({ region: "eu-north-1" });

exports.handler = async (event) => {
  const { email, password } = JSON.parse(event.body);

  if (!email || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Email and password required" })
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const input = {
    TableName: "Users",
    Item: {
      email: { S: email },
      passwordHash: { S: passwordHash }
    }
  };

  try {
    const command = new PutItemCommand(input);
    await client.send(command);

    return {
      statusCode: 201,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: "User created successfully" })
    };
  } catch (err) {
    console.error("Signup error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Signup failed" })
    };
  }
};
