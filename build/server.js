// Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Set express app
const app = express();

// Mimic database data
const users = [
  {
    email: "test@ns8.com",
    password: "passwordIsPizza",
    phone: "333-222-1111"
  }
];

// Set Helmet for app security
app.use(helmet());

// Set bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// Enable CORS for all requests
app.use(cors());

// Set morgan to log HTTP requests
app.use(morgan("combined"));

app.get("/", (req, res, next) => {
  res.send(users);
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server started...");
});
