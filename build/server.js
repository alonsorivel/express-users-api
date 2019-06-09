const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  res.send("Users API");
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server started...");
});
