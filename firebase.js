// src/firebase.js

import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA-JjuLx6ysUZ923jFYEkTe6jjR1Fdiafo",
  authDomain: "ventario-936b3.firebaseapp.com",
  projectId: "ventario-936b3",
  storageBucket: "ventario-936b3.appspot.com",
  messagingSenderId: "608432331244",
  appId: "1:608432331244:web:5a6985f50f52c7fe7888c9"
};
const app = firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
export const messaging = getMessaging(app);
export default firebase;

export const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      const token = await getToken(messaging, {
        vapidKey: 'BIRaNEWZJdsHl2h5yUEZjrys3aBl89Ww9oNftYN8xu389WPtT7zLZ7yhMlNh4n5sjMgCRAKEBl-Hv1j21extVEw'
      });
      console.log('Token => ', token);
      sessionStorage.setItem('token-notification', token);
    } else {
      console.log('Unable to get permission to notify.');
    }
  } catch (error) {
    console.error('Error requesting permission:', error);
  }
};
requestPermission();

export const onMessageListener = () => {
  console.log('Setting up message listener...');
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('Message received:', payload);
      resolve(payload);
    });
  });
};
