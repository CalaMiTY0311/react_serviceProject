const { initializeApp } = require("firebase/app");
const { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification, 
  sendPasswordResetEmail
} = require("firebase/auth") ;
const { getFirestore, collection, doc, getDocs, query, setDoc, where } = require('firebase/firestore');

require('dotenv').config();

const admin = require('firebase-admin');
const serviceAccount = require("./firebaseService.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
    };
    
  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const getDoc = setDoc(app)
  const firestore = getFirestore(app);
//   const storage = getStorage(app);

// const database = app.database();

module.exports = {
  app,
  admin,
  auth,
  firestore,
  // getDoc,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  // admin
};