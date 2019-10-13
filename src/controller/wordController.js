const { findWords } = require("../repository/wordRepository");

export async function getWords(_, res) {
  res.json(await findWords());
}
