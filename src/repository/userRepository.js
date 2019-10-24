const uuid = require("uuid/v4");
const { Firestore } = require("@google-cloud/firestore");

const firestore = new Firestore();

const createUser = async username => {
  const collectionRef = firestore.collection("users");
  await collectionRef.doc(uuid()).set({
    username
  });
};

const findUsers = async () => {
  const query = firestore.collection("users");
  const snapshot = await query.get();
  return snapshot.docs.map(doc => doc.data());
};

module.exports = { createUser, findUsers };
