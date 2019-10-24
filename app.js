const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const {
  addWord,
  deleteWord,
  getWords,
  note,
  rate
} = require("./src/controller/wordController");
const { addUser, getUsers } = require("./src/controller/userController");

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ["Authorization", "Content-Type"]
  })
);
app.use(bodyParser.json());
const port = 80;

app.use((req, res, next) => {
  req.username = req.header("authorization");
  next();
});

app.get("/words", getWords);

app.post("/words", addWord);

app.post("/words/:id/rate", rate);

app.post("/words/:id/note", note);

app.delete("/words/:id", deleteWord);

app.get("/users", getUsers);

app.post("/users", addUser);

app.all("/", (_, res) => res.status(200).send());

app.listen(port, () => console.log(`Listening on port ${port}!`));
