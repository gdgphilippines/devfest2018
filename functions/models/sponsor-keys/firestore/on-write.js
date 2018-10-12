const onWrite = admin => (change, context) => {
  const { before, after } = change;
  const { params } = context;
  const { eventId, sponsorId } = params;
  const document = after.exists ? after.data() : null;
  const oldDocument = before.exists ? before.data() : null;
  const database = admin.database();
  const path = `events/${eventId}/sponsor-keys/data`;
  // const pathType = `events/${eventId}/sponsor-types`;
  const updates = {};
  if (oldDocument) {
    updates[`${path}/${sponsorId}`] = null;
  }
  if (document) { // onCreate or onUpdate
    updates[`${path}/${sponsorId}`] = document.secretKey;
  }

  return database.ref().update(updates);
};

module.exports = (functions, admin) => functions
  .firestore
  .document(`sponsors/{eventId}/sponsor-keys/{sponsorId}`)
  .onWrite(onWrite(admin));
