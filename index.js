const express = require("express");
const path = require("path");
const twilio = require("twilio");
// const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const app = express();

const port = 3000;

//Adding Connection to Database
const { MongoClient } = require("mongodb");

// Parse JSON requests
app.use(bodyParser.json());

// Connect to the MongoDB database
const client = new MongoClient("mongodb://localhost:27017", {
  useNewUrlParser: true,
});
client.connect();

//Declaring Twilio credentials

const accountSid = "AC93aef2bb031030bbc966e6d3509df4f3";
const authToken = "197c417df650bc7be903999eed6dfa9a";
const twilioClient = twilio(accountSid, authToken);

// Adding handler for form post

app.use(bodyParser.json());
app.get("/", (req, res) => {
  // res.send("Hello World");
  res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static(path.resolve(__dirname, "public")));
app.post("/post-credentials", async function (req, res) {
  const { mobileNumber, message } = req.body;

  //Sending Message through SMS
  await twilioClient.messages.create({
    to: mobileNumber,
    body: message,
    from: "+15746867608",
  });

  //Sending sms through whatsapp
  await twilioClient.messages.create({
    to: `whatsapp:${mobileNumber}`,
    body: message,
    from: "whatsapp:+14155238886",
  });

  const db = client.db("twilio_sms");
  await db.collection("Twilio_sms").insertOne({
    mobileNumber,
    message,
    sentAt: new Date(),
  });

  res.sendStatus(200);
  // res.send("Data received:\n" + JSON.stringify(req.body));
});

app.get("/messages", async (req, res) => {
  // Retrieve all messages from the database
  const db = client.db("twilio_sms");
  const messages = await db.collection("Twilio_sms").find().toArray();
  res.send(messages);
  // res.render("MessageList", { messages: messages });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
