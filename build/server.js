// Import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Import express routers
const home = require("./routes/home");
const users = require("./routes/users");
const events = require("./routes/events");

// Database integration
const { startDatabase } = require("./database/mongo");

// Set express app
const app = express();

// Set Helmet for app security
app.use(helmet());

// Set bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// Enable CORS for all requests
app.use(cors());

// Set morgan to log HTTP requests
app.use(morgan("combined"));

// Set router to manage home requests
app.use("/", home);

// Set router to manage users
app.use("/users", users);

// Set router to manage events
app.use("/events", events);

// Start server
const server = app.listen(process.env.PORT || 3001, () => {
  console.log("Server started...");
});

// Export server for testing
module.exports = server;
