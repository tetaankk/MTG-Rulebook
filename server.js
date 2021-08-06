const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();

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
      const rules = body
        .substring(
          body.lastIndexOf("1. Game Concepts"),
          body.lastIndexOf("Glossary")
        )
        .replace(/\r/g, "")
        .split("\n")
        .filter(Boolean);

      const ruleBookChapters = [];
      const ruleBookChapterSections = [];
      const ruleBookRules = [];
      const ruleBookSubRules = [];

      rules.forEach((line) => {
        if (/^\d{1}\D/.test(line)) {
          const chapterKey = line.substring(0, 1);
          const chapterContent = line.substring(3);
          ruleBookChapters.push({
            chapterKey: chapterKey,
            chapterContent: chapterContent,
            sections: [],
          });
        } else if (/^\d{3}\D\s/.test(line)) {
          const sectionKey = line.substring(0, 3);
          const sectionContent = line.substring(4).trim();
          ruleBookChapterSections.push({
            sectionKey: sectionKey,
            sectionContent: sectionContent,
            rules: [],
          });
        } else if (/^\d{3}\.\d{1}\./.test(line)) {
          const ruleKey = line.substring(0, 5);
          const ruleContent = line.substring(6).trim();
          ruleBookRules.push({
            ruleKey: ruleKey,
            ruleContent: ruleContent,
            subRules: [],
          });
        } else if (/^\d{3}\.\d{1}[a-z]{1}/.test(line)) {
          const subRuleKey = line.substring(0, 6);
          const subRuleContent = line.substring(7).trim();
          ruleBookSubRules.push({
            subRuleKey: subRuleKey,
            subRuleContent: subRuleContent,
          });
        }
      });

      // Insert sub-rules into rules
      for (let i = 0; i < ruleBookRules.length; i++) {
        for (let j = 0; j < ruleBookSubRules.length; j++) {
          if (
            ruleBookSubRules[j].subRuleKey.substring(0, 5) ===
            ruleBookRules[i].ruleKey.substring(0, 5)
          ) {
            ruleBookRules[i].subRules.push(ruleBookSubRules[j]);
          }
        }
      }

      // Insert rules into sections
      for (let i = 0; i < ruleBookChapterSections.length; i++) {
        for (let j = 0; j < ruleBookRules.length; j++) {
          if (
            ruleBookRules[j].ruleKey.substring(0, 3) ===
            ruleBookChapterSections[i].sectionKey.substring(0, 3)
          ) {
            ruleBookChapterSections[i].rules.push(ruleBookRules[j]);
          }
        }
      }

      // Insert subchapters into chapters
      for (let i = 0; i < ruleBookChapters.length; i++) {
        for (let j = 0; j < ruleBookChapterSections.length; j++) {
          if (
            ruleBookChapterSections[j].sectionKey.substring(0, 1) ===
            ruleBookChapters[i].chapterKey
          ) {
            ruleBookChapters[i].sections.push(ruleBookChapterSections[j]);
          }
        }
      }

      //console.log(ruleBookChapters);
      //console.log(ruleBookChapterSections);
      //console.log(ruleBookRules);
      //console.log(ruleBookSubRules);

      res.header("Content-Type", "text/plain");
      res.status(200).send(ruleBookChapters);
    });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`App listening to port ${port}`));
