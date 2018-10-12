module.exports = (admin, firestore) => (user) => {
  // do other things here before deleting
  const { uid, displayName: name, email } = user;

  return firestore.doc(`users/${uid}`).set({
    name,
    email,
    gender: '',
    dateCreated: admin.firestore.FieldValue.serverTimestamp(),
    dateUpdated: admin.firestore.FieldValue.serverTimestamp()
  });
};
