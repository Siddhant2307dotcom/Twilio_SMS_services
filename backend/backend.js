const express = require("express");
const twilio = require("twilio");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

// Create a new Express app
const app = express();

// Parse JSON requests
app.use(bodyParser.json());

// Connect to the MongoDB database
const client = new MongoClient("mongodb://localhost:27017", {
  useNewUrlParser: true,
});
client.connect();

// Twilio API credentials
const accountSid = "AC93aef2bb031030bbc966e6d3509df4f3";
const authToken = "[AuthToken]";
const twilioClient = require("twilio")(accountSid, authToken);

// Endpoint for sending a message
app.post("/send", async (req, res) => {
  // Get the mobile number and message from the request body
  const { mobileNumber, message } = req.body;

  // Send the SMS message
  await twilioClient.messages.create({
    to: mobileNumber,
    body: message,
    from: "+15746867608",
  });

  // Send the WhatsApp message
  await twilioClient.messages.create({
    to: `whatsapp:${mobileNumber}`,
    body: message,
    from: "your_twilio_whatsapp_number",
  });

  // Store the message details in the database
  const db = client.db("messages");
  await db.collection("sentMessages").insertOne({
    mobileNumber,
    message,
    sentAt: new Date(),
  });

  res.sendStatus(200);
});

// Endpoint for retrieving all sent messages
app.get("/messages", async (req, res) => {
  // Retrieve all messages from the database
  const db = client.db("messages");
  const messages = await db.collection("sentMessages").find().toArray();

  res.send(messages);
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
