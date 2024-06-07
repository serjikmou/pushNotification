const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const PushNotifications = require("node-pushnotifications");

const app = express();
app.use(cors());
// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "*");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

const publicVapidKey =
  "BPPsaQD6XUBcleOncy3YYBQMhrTxYc88kKb8nuvB8K1K5wtWIBIjC2YtXrN4eOyhmY_V2cjlIiRTP79X8dA7pfY"; // REPLACE_WITH_YOUR_KEY
const privateVapidKey = "f70-RKzeA40Nfu35XiJhgTFjr6Fd2qQh-kjwSaHG5Wg"; //REPLACE_WITH_YOUR_KEY

app.post("/subscribe", (req, res) => {
  console.log(req.body);
  // Get pushSubscription object
  const subscription = req.body;
  const settings = {
    web: {
      vapidDetails: {
        subject: "mailto: <serjikmousavi@gmail.com>", // REPLACE_WITH_YOUR_EMAIL
        publicKey: publicVapidKey,
        privateKey: privateVapidKey,
      },
      gcmAPIKey: "gcmkey",
      TTL: 2419200,
      contentEncoding: "aes128gcm",
      headers: {},
    },
    isAlwaysUseFCM: false,
  };

  // Send 201 - resource created
  const push = new PushNotifications(settings);

  // Create payload
  const payload = { title: "salam", body: "khobi", color: "#ffff" };
  push.send(subscription, payload, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send("ok");
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/main.js", (req, res) => {
  res.sendFile(__dirname + "/main.js");
});
app.get("/sw.js", (req, res) => {
  res.sendFile(__dirname + "/sw.js");
});

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
