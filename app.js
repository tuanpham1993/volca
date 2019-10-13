const express = require("express");
const cors = require("cors");
const { getWords } = require("./src/controller/wordController");

const app = express();
app.use(cors());
const port = 80;

app.get("/words", getWords);

app.all("/", (_, res) => res.status(200).send());

app.listen(port, () => console.log(`Listening on port ${port}!`));
