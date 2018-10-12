const fetch = require('node-fetch');
const { key } = require('../../../config/eventbrite-secret.json');
const { event, questions } = require('../../../config/eventbrite.js');

const onWrite = (admin, firestore) => (change, context) => {
  const { before, after } = change;
  const { params } = context;
  const { eventId, userId } = params;
  const document = after.exists ? after.val() : null;
  const oldDocument = before.exists ? before.val() : null;
  const database = admin.database();
  const path = `events/${eventId}/reverse-tickets/data/`;
  const updates = {};

  if (oldDocument) {
    const { ticketId } = oldDocument;
    updates[`${path}/${ticketId}`] = null;
  }
  if (document) { // onCreate or onUpdate
    // const { typeId } = document;
    const { ticketId } = document;
    if (!event[eventId]) {
      const error = new Error('No event in eventbrite json');
      return Promise.reject(error);
    }
    const url = `https://www.eventbriteapi.com/v3/events/${event[eventId]}/attendees/${ticketId.substring(9, 19)}?token=${key}`;

    return database.ref(`${path}/${ticketId}`).once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          const error = new Error('Ticket is already connected to another account');
          return Promise.reject(error);
        }
        return fetch(url);
      })
      .then(result => result.json())
      .then(json => {
        if (json.status_code === 400) {
          return Promise.reject(json);
        }

        if (!json.profile) {
          return Promise.reject(json);
        }

        const { profile, answers } = json;
        const {
          name,
          addresses,
          company,
          cell_phone: phone,
          job_title: position,
          gender,
          age,
          email
        } = profile;
        const eventResponse = {};
        let home = null;
        let work = null;
        if (addresses) {
          home = addresses.home;
          work = addresses.work;
        }

        if (answers && answers.length) {
          answers.forEach(answerObj => {
            const { question_id: question, answer } = answerObj;
            const prop = questions[eventId][question];
            if (prop && answer) {
              eventResponse[prop] = answer;
            }
          });
        }

        const obj = {
          email,
          name,
          gender,
          home,
          work,
          company,
          age,
          phone,
          position,
          eventResponse
        };

        return Promise.all([
          Promise.resolve(obj),
          firestore.doc(`events/${eventId}/tickets/${userId}`).set(Object.assign({}, obj, {
            ticketId
          })),
          firestore.doc(`users/${userId}`).update({
            gender,
            home,
            work,
            company,
            age,
            phone,
            position
          })
        ]);
      })
      .then(results => {
        const {
          email,
          name,
          gender,
          age,
          phone,
          eventResponse
        } = results[0];
        updates[`${path}/${ticketId}`] = {
          userId,
          informationConsent: (eventResponse && eventResponse.informationConsent) || false,
          email: email || '',
          name: name || '',
          age: age || '',
          phone: phone || '',
          gender: gender || '',
          positionType: (eventResponse && eventResponse.positionType) || ''
        };
        return database.ref().update(updates);
      })
      .catch(error => {
        console.error(error);
        updates[`events/${eventId}/tickets/data/${userId}`] = null;
        return Promise.all([
          database.ref().update(updates),
          firestore.doc(`events/${eventId}/tickets/${userId}`).delete()
        ]);
      });
  } else {
    return firestore.doc(`events/${eventId}/tickets/${userId}`).delete()
      .then(() => {
        return database.ref().update(updates);
      });
  }
};

module.exports = (functions, admin, firestore) => functions
  .database
  .ref(`events/{eventId}/tickets/data/{userId}`)
  .onWrite(onWrite(admin, firestore));
