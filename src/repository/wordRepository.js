const uuid = require("uuid/v4");
const { Firestore } = require("@google-cloud/firestore");

const firestore = new Firestore();

const createWord = async word => {
  const collectionRef = firestore.collection("words");
  await collectionRef.doc(uuid()).set({
    word,
    rating: [],
    note: ""
  });
};

const findWords = async reqQuery => {
  const query = firestore.collection("words");
  const snapshot = await query.get();
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

  //   // Enter new data into the document.
  //   await document.set({
  //     title: 'Welcome to Firestore',
  //     body: 'Hello World',
  //   });
  //   console.log('Entered new data into the document');

  //   // Update an existing document.
  //   await document.update({
  //     body: 'My first Firestore app',
  //   });
  //   console.log('Updated an existing document');

  // Read the document.
  //   let doc = await document.get();
  //   console.log('Read the document');
  //   console.log(doc)

  //   // Delete the document.
  //   await document.delete();
  //   console.log('Deleted the document');
};

const findWord = async id => {
  const docRef = firestore.doc(`words/${id}`);
  return (await docRef.get()).data();
};

const updateWord = async (id, data) => {
  const docRef = firestore.doc(`words/${id}`);
  await docRef.update(data);
};

module.exports = { createWord, findWord, findWords, updateWord };
