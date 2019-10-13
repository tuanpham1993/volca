const { findWords } = require("../repository/wordRepository");

const getWords = async (_, res) => {
  res.json(await findWords({}));
};

module.exports = { getWords };
