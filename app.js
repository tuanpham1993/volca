const express = require("express");
const { getWords } = require("./src/controller/wordController");

const app = express();
const port = 80;

app.get("/words", getWords);

app.listen(port, () => console.log(`Listening on port ${port}!`));
