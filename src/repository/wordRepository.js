const uuid = require('uuid/v4')
const { Firestore } = require("@google-cloud/firestore");

const firestore = new Firestore();

const createWord = async word => {
  const collectionRef = firestore.collection("words");
  await collectionRef.doc(uuid()).set({
    word,
    forgotten: false,
    ignored: false
  });
};

const findWords = async ({ forgotten = false, ignored = false }) => {
  // Obtain a document reference.
  //   const document = firestore.doc('words/LQpMvceQwKCtNaNKw4Tw');
  const snapshot = await firestore.collection("words").get();
  return snapshot.docs.map(doc => doc.data());

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

module.exports = { createWord, findWords };
