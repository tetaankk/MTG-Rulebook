const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const app = express();
const {ruleParser} = require('./rule-parser.js')
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/rules", (req, res) => {
  fetch(
    "https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt"
  )
    .then((res) => res.text())
    .then((body) => {
      const rules = ruleParser(body);
      res.header("Content-Type", "text/plain");
      res.status(200).send(rules);
    });
});


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`App listening to port ${port}`));
