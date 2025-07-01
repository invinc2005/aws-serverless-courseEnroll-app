const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const bcrypt = require("bcryptjs");

const client = new DynamoDBClient({ region: "eu-north-1" });

exports.handler = async (event) => {
  const { email, password } = JSON.parse(event.body);

  if (!email || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Email and password are required." }),
    };
  }

  try {
    const data = await client.send(new GetItemCommand({
      TableName: "Admins",
      Key: { email: { S: email } },
    }));

    if (!data.Item) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Admin not found" }),
      };
    }

    const isValid = await bcrypt.compare(password, data.Item.passwordHash.S);

    if (!isValid) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Invalid credentials" }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: "Admin login successful", email }),
    };
  } catch (err) {
    console.error("Admin login error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
