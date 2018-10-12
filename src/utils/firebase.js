import { configs } from '../../config/firebase.config.js';
import { updateState } from './state';
const { fetch } = window;
let firebase = null;
let firestore = null;
let storage = null;
let userUpdating = false;
const settings = {
  /* your settings... */
  timestampsInSnapshots: true
};

const init = async () => {
  const { firebase } = await import('./firebase-loader.js');
  for (let i in configs) {
    if (i === 'main') {
      firebase.initializeApp(configs[i]);
    }
  }
  const firestore = firebase.firestore();
  firestore.settings(settings);

  const storage = firebase.storage();
  return { firebase, firestore, storage };
};

const databaseGet = async (dbName, query) => {
  const { path, filters } = query;
  if (firebase) {
    let ref = firebase.database().ref(path);
    for (let i in filters) {
      if (i === 'orderBy') {
        switch (filters[i]) {
          case '$key':
            ref = ref.orderByKey();
            break;
          case '$value':
            ref = ref.orderByValue();
            break;
          default:
            ref = ref.orderByChild(filters[i]);
        }
      } else {
        ref = ref[i](filters[i]);
      }
    }
    const snapshot = await ref.once('value');
    return snapshot.val();
  } else {
    const config = configs[dbName];
    let queryParams = [];
    for (let i in filters) {
      queryParams.push(`${i}="${encodeURI(filters[i])}"`);
    }
    const data = await fetch(`${config.databaseURL}/${path}.json?${queryParams.join('&')}`).then(result => result.json());
    return data;
  }
};

const storageGetURL = async (path) => {
  if (storage) {
    const ref = storage.ref(path);
    const url = await ref.getDownloadURL();
    return url;
  }
};

const firestoreGet = async (path, field) => {
  if (firestore) {
    const ref = firestore.doc(path);
    const doc = await ref.get();
    const { id: $key } = doc;
    const obj = { $key };
    if (field) {
      obj[field] = doc.get(field);
      return obj;
    }
    return { ...(doc.data()), ...obj };
  }
};

const updateUser = async (user) => {
  // prevents from double updating.
  if (!userUpdating) {
    userUpdating = true;
    await updateState('user', { user, userLoaded: true });
  }
  userUpdating = false;
};

init().then(result => {
  firebase = result.firebase;
  firestore = result.firestore;
  storage = result.storage;
  firebase.auth().onAuthStateChanged(updateUser);
  return updateState('firebase-ready', true);
});

export { firebase, firestore, storage, updateUser, databaseGet, firestoreGet, storageGetURL };
