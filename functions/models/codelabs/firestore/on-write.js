const onWrite = admin => (change, context) => {
  const { before, after } = change;
  const { params } = context;
  const { codelabId } = params;
  const document = after.exists ? after.data() : null;
  const oldDocument = before.exists ? before.data() : null;
  const database = admin.database();
  // const pathType = `events/${eventId}/sponsor-types`;
  const updates = {};
  if (oldDocument) {
    const { events, typeId } = oldDocument;
    for (let i in events) {
      const eventId = events[i];
      const path = `events/${eventId}/codelabs`;
      updates[`${path}/data/${codelabId}`] = null;
      if (typeId) {
        updates[`${path}/lists/types/${typeId}/${codelabId}`] = null;
      }
    }
  }
  if (document) { // onCreate or onUpdate
    const { events, typeId, name, list } = document;
    for (let i in events) {
      const eventId = events[i];
      const path = `events/${eventId}/codelabs`;
      updates[`${path}/data/${codelabId}`] = {
        name: name || '',
        typeId: typeId || '',
        list: list || []
      };
      if (typeId) {
        updates[`${path}/lists/types/${typeId}/${codelabId}`] = {
          name: name || '',
          typeId: typeId || ''
        };
      }
    }
  }

  return database.ref().update(updates);
};

module.exports = (functions, admin) => functions
  .firestore
  .document(`codelabs/{codelabId}`)
  .onWrite(onWrite(admin));
