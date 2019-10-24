const { createUser, findUsers } = require("../repository/userRepository");

const getUsers = async (req, res) => {
  res.json(await findUsers());
};

const addUser = async (req, res) => {
  const { username } = req.body;
  const users = await findUsers();
  if (users.some(user => user.username === username)) {
    res.status(400).send();
    return;
  }

  await createUser(username);
  res.status(200).send();
};

module.exports = { addUser, getUsers };
