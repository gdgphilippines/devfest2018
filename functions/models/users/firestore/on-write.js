const onWrite = (firestore) => (change, context) => {
  const { before, after } = change;
  const { params } = context;
  const { userId } = params;
  const document = after.exists ? after.data() : null;
  const oldDocument = before.exists ? before.data() : null;

  if (document && !oldDocument) { // onCreate
    return firestore.doc(`permissions/${userId}`).set({
      writeDatabase: [],
      readDatabase: [],
      writeFirestore: [],
      readFirestore: [],
      writeStorage: [],
      readStorage: []
    });
  } else if (oldDocument && !document) { // onDelete
    return firestore.doc(`permissions/${userId}`).delete();
  }
  return null;
};

module.exports = (functions, firestore) => functions
  .firestore
  .document(`users/{userId}`)
  .onWrite(onWrite(firestore));
