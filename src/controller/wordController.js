const isEmpty = require("lodash/isEmpty");
const reduce = require("lodash/reduce");
const {
  createWord,
  findWord,
  findWords,
  updateWord
} = require("../repository/wordRepository");

const appendPoint = word => {
  if (isEmpty(word.rating)) {
    // Not have any rating, 0 point
    return {
      ...word,
      point: 0
    };
  }

  const point = reduce(
    word.rating,
    (prev, item, index) => prev + item * (index + 1),
    0
  );

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

  if (a.rating.length < b.rating.length) {
    return -1;
  }

  if (a.rating.length > b.rating.length) {
    return 1;
  }

  return 0;
};

const appendRating = (word, rating) => {
  if (word.rating.length < 5) {
    word.rating.push(rating);
  } else {
    word.rating.shift().push(rating);
  }
};

const getWords = async (req, res) => {
  const { query, username } = req;
  const words = (await findWords(query, username)).map(word =>
    appendPoint(word)
  );

  res.json(words.sort(sortFunc));
};

const addWord = async (req, res) => {
  const {
    body: { word },
    username
  } = req;

  const words = await findWords({}, username);
  if (words.some(({ word: current }) => word === current)) {
    res.status(400).send();
    return;
  }

  await createWord(word, username);
  res.status(200).send();
};

const note = async (req, res) => {
  const { id } = req.params;
  const {
    body: { note }
  } = req;
  await updateWord(id, { note });
  res.status(200).send();
};

const rate = async (req, res) => {
  const { id } = req.params;
  const {
    body: { rating }
  } = req;
  const word = await findWord(id);

  appendRating(word, rating);
  await updateWord(id, word);

  res.status(200).send();
};

module.exports = { addWord, getWords, note, rate };
