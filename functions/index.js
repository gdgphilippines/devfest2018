const functions = require('firebase-functions');
const admin = require('firebase-admin');

const helloWorld = require('./actions/helloworld');
const connectSponsorMembers = require('./actions/connect-sponsor-members.js');
const sponsorScanMembers = require('./actions/sponsor-scan-members.js');
const user = require('./models/users/https');
const speakerDatabaseOnWrite = require('./models/speakers/database/on-write');
const sessionDatabaseOnWrite = require('./models/sessions/database/on-write');
const scheduleDayFirestoreOnWrite = require('./models/schedule-days/firestore/on-write');
const scheduleTimeslotFirestoreOnWrite = require('./models/schedule-timeslots/firestore/on-write');
const scheduleSessionFirestoreOnWrite = require('./models/schedule-sessions/firestore/on-write');
const sponsorTypeFirestoreOnWrite = require('./models/sponsor-types/firestore/on-write');
const sponsorCompanyFirestoreOnWrite = require('./models/sponsor-companies/firestore/on-write');
const sponsorKeysFirestoreOnWrite = require('./models/sponsor-keys/firestore/on-write');
const sponsorMembersDatabaseOnWrite = require('./models/sponsor-members/database/on-write');
const userAuthOnCreate = require('./models/users/auth/on-create');
const userAuthOnDelete = require('./models/users/auth/on-delete');
const userFirestoreOnWrite = require('./models/users/firestore/on-write');
const permissionFirestoreOnWrite = require('./models/permissions/firestore/on-write');
const eventTicketsFirebaseOnWrite = require('./models/event-tickets/firebase/on-write');

admin.initializeApp();

const settings = { timestampsInSnapshots: true };
const firestore = admin.firestore();
firestore.settings(settings);

// auth
exports.userAuthOnCreate = functions.auth.user().onCreate(userAuthOnCreate(admin, firestore));
exports.userAuthOnDelete = functions.auth.user().onDelete(userAuthOnDelete(firestore));

exports.helloWorld = functions.https.onRequest(helloWorld());
exports.connectSponsorMembers = functions.https.onRequest(connectSponsorMembers(admin));
exports.sponsorScanMembers = functions.https.onRequest(sponsorScanMembers(admin));
exports.user = functions.https.onRequest(user());
exports.speakerDatabaseOnWrite = speakerDatabaseOnWrite(functions);
exports.sessionDatabaseOnWrite = sessionDatabaseOnWrite(functions);
exports.scheduleDayFirestoreOnWrite = scheduleDayFirestoreOnWrite(functions, admin);
exports.scheduleTimeslotFirestoreOnWrite = scheduleTimeslotFirestoreOnWrite(functions, admin);
exports.scheduleSessionFirestoreOnWrite = scheduleSessionFirestoreOnWrite(functions, admin);
exports.sponsorTypeFirestoreOnWrite = sponsorTypeFirestoreOnWrite(functions, admin);
exports.sponsorCompanyFirestoreOnWrite = sponsorCompanyFirestoreOnWrite(functions, admin);
exports.sponsorKeysFirestoreOnWrite = sponsorKeysFirestoreOnWrite(functions, admin);
exports.sponsorMembersDatabaseOnWrite = sponsorMembersDatabaseOnWrite(functions, admin);
exports.userFirestoreOnWrite = userFirestoreOnWrite(functions, firestore);
exports.permissionFirestoreOnWrite = permissionFirestoreOnWrite(functions, admin);
exports.eventTicketsFirebaseOnWrite = eventTicketsFirebaseOnWrite(functions, admin, firestore);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
