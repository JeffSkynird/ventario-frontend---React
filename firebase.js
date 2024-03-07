// src/firebase.js

import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-JjuLx6ysUZ923jFYEkTe6jjR1Fdiafo",
  authDomain: "ventario-936b3.firebaseapp.com",
  projectId: "ventario-936b3",
  storageBucket: "ventario-936b3.appspot.com",
  messagingSenderId: "608432331244",
  appId: "1:608432331244:web:5a6985f50f52c7fe7888c9"
};
firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
export default firebase;