const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const {
  addWord,
  getWords,
  note,
  rate
} = require("./src/controller/wordController");

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 80;

app.get("/words", getWords);

app.post("/words", addWord);

app.post("words/:id/rate", rate);

app.post("words/:id/note", note);

app.all("/", (_, res) => res.status(200).send());

app.listen(port, () => console.log(`Listening on port ${port}!`));
