const isEmpty = require("lodash/isEmpty");
const reduce = require("lodash/reduce");
const length = require("lodash/length");
const {
  createWord,
  findWord,
  findWords,
  updateWord
} = require("../repository/wordRepository");

const appendPoint = word => {
  if (isEmpty(word.rating)) {
    // Not have any rating, 0 point
    return 0;
  }

  const point =
    reduce(word.rating, (prev, item, index) => prev + item * (index + 1), 0) /
    word.rating.length;

  return {
    ...word,
    point
  };
};

const sortFunc = (a, b) => {
  if (a.point < b.point) {
    return -1;
  }

  if (a.point > b.point) {
    return 1;
  }

  if (length(a.rating) < length(b.rating)) {
    return -1;
  }

  if (length(a.rating) > length(b.rating)) {
    return 1;
  }

  return 0;
};

const appendRating = (word, rating) => {
  if (length(word.rating) < 5) {
    word.rating.push(rating);
  } else {
    word.rating.shift().push(rating);
  }
};

const getWords = async (req, res) => {
  const { query } = req;
  const words = await findWords(query);

  res.json(words.sort(sortFunc));
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

const note = async (req, res) => {
  const { id = req.params };
  const { body: { note }} = req;
  await updateWord(id, { note })
}

const rate = async (req, res) => {
  const { id } = req.params;
  const {
    body: { rating }
  } = req;
  const word = await findWord(id);

  appendRating(word, rating);
  await updateWord(body.id, word);

  res.status(200).send();
};

module.exports = { addWord, getWords, note, rate };
