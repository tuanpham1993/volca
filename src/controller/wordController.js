const shuffle = require("shuffle-array");
const { createWord, findWords } = require("../repository/wordRepository");

const getWords = async (req, res) => {
  const { query } = req;
  res.json(shuffle(await findWords(query)));
};

const addWord = async (req, res) => {
  const {
    body: { word }
  } = req;

  const words = await findWords({});
  if (words.some(({ word: current }) => word === current)) {
    res.status(400).send();
    return;
  }

  await createWord(word);
  res.status(200).send();
};

module.exports = { addWord, getWords };
