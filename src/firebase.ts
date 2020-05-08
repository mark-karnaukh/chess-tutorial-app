// Firebase
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Constants
import {
  PROP_API_KEY,
  PROP_APP_ID,
  PROP_AUTH_DOMAIN,
  PROP_DATABASE_URL,
  PROP_MESSAGING_SENDER_ID,
  PROP_PROJECT_ID,
  PROP_STORAGE_BUCKET,
} from './constants';

// Initializing a firebase app
export const firebaseApp = firebase.initializeApp({
  [PROP_API_KEY]: process.env.REACT_APP_FIREBASE_KEY,
  [PROP_AUTH_DOMAIN]: process.env.REACT_APP_FIREBASE_DOMAIN,
  [PROP_DATABASE_URL]: process.env.REACT_APP_FIREBASE_DATABASE,
  [PROP_PROJECT_ID]: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  [PROP_STORAGE_BUCKET]: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  [PROP_MESSAGING_SENDER_ID]: process.env.REACT_APP_FIREBASE_SENDER_ID,
  [PROP_APP_ID]: process.env.REACT_APP_FIREBASE_APP_ID,
});

// Getting reference links to firebase auth and firestore services
// and exporting them
export const auth = firebaseApp.auth();
export const db = firebaseApp.firestore();
