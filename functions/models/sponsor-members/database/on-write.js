const onWrite = (admin) => (change, context) => {
  const { after, before } = change;
  const { params } = context;
  const { eventId, userId } = params;
  const document = after.exists ? after.val() : null;
  const oldDocument = before.exists ? before.val() : null;
  const database = admin.database();
  const updates = {};
  if (oldDocument) {
    const { sponsorId } = oldDocument;
    updates[`events/${eventId}/sponsor-members/list/sponsors/${sponsorId}/${userId}`] = null;
  }
  if (document) {
    const { sponsorId } = document;
    updates[`events/${eventId}/sponsor-members/list/sponsors/${sponsorId}/${userId}`] = true;
  }
  return database.ref().update(updates);
};

module.exports = (functions, admin) => functions
  .database
  .ref(`events/{eventId}/sponsor-members/data/{userId}`)
  .onWrite(onWrite(admin));
