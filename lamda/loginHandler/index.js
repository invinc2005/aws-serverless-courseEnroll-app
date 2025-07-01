const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");
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

  const getCmd = new GetItemCommand({
    TableName: "Users",
    Key: { email: { S: email } }
  });

  try {
    const result = await client.send(getCmd);

    if (!result.Item) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "User not found" })
      };
    }

    const hash = result.Item.passwordHash.S;
    const isValid = await bcrypt.compare(password, hash);

    if (!isValid) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Invalid credentials" })
      };
    }

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: "Login successful", email })
    };

  } catch (err) {
    console.error("Login error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Login failed" })
    };
  }
};
