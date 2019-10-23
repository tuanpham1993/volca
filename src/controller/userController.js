const { findUsers } = require("../repository/userRepository");

const getUsers = async (req, res) => {
  res.json(await findUsers());
};

module.exports = { getUsers };
