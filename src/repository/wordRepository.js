const { Firestore } = require("@google-cloud/firestore");

const firestore = new Firestore();

export async function addWord(word) {
  const collectionRef = firestore.collection('words');
  await collectionRef.add({
    word,
    forgotten: false,
    ignored: false,
  })
}

export async function findWords({ forgotten = false, ignored = false}) {
  // Obtain a document reference.
  //   const document = firestore.doc('words/LQpMvceQwKCtNaNKw4Tw');
  const snapshot = await firestore.collection('words').get();
  return snapshot.docs().map(doc => doc.data())

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
}