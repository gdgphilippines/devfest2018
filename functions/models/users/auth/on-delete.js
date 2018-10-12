module.exports = (firestore) => (user) => {
  // do other things here before deleting
  const { uid } = user;

  return Promise.all([
    firestore.doc(`users/${uid}`).delete(),
    firestore.doc(`permissions/${uid}`).delete()
  ]);
};
