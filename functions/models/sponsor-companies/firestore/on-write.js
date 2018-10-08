const onWrite = admin => (change, context) => {
  const { before, after } = change;
  const { params } = context;
  const { eventId, sponsorId } = params;
  const document = after.exists ? after.data() : null;
  const oldDocument = before.exists ? before.data() : null;
  const database = admin.database();
  const bucket = admin.storage().bucket();
  const path = `events/${eventId}/sponsors`;
  // const pathType = `events/${eventId}/sponsor-types`;
  const updates = {};
  if (oldDocument) {
    // const { typeId } = oldDocument;
    // updates[`${path}/lists/days/${dayId}/${timeslotId}`] = null;
  }
  if (document) { // onCreate or onUpdate
    // const { typeId } = document;
    updates[`${path}/data/${sponsorId}`] = {
      name: document.name || '',
      url: document.url || '',
      img: document.img || '',
      thumbnail: document.thumbnail || '',
      storageImg: document.storageImg || '',
      storageThumbnail: document.storageThumbnail || '',
      typeId: document.typeId || ''
    };
    if (document.typeId) {
      updates[`${path}/lists/types/${document.typeId}/${sponsorId}`] = true;
    }
    if (bucket && document.storageImg) {
      const file = bucket.file(document.storageImg);
      return file
        .exists()
        .then(response => {
          const [exists] = response;
          return exists ? file.makePublic() : Promise.resolve();
        })
        .then(response => {
          return response ? file.getMetadata() : Promise.resolve();
        })
        .then(response => {
          if (response) {
            const [metadata] = response;
            if (metadata) {
              const { mediaLink } = metadata;
              console.log(mediaLink);
              updates[`${path}/data/${sponsorId}`].img = mediaLink;
            }
          }
          return database.ref().update(updates);
        });
    }
  } else { // onDelete
    updates[`${path}/data/${sponsorId}`] = null;
  }

  return database.ref().update(updates);
};

module.exports = (functions, admin) => functions
  .firestore
  .document(`sponsors/{eventId}/companies/{sponsorId}`)
  .onWrite(onWrite(admin));
