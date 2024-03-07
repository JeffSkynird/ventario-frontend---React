importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js');
 
firebase.initializeApp({
    apiKey: "AIzaSyA-JjuLx6ysUZ923jFYEkTe6jjR1Fdiafo",
  authDomain: "ventario-936b3.firebaseapp.com",
  projectId: "ventario-936b3",
  storageBucket: "ventario-936b3.appspot.com",
  messagingSenderId: "608432331244",
  appId: "1:608432331244:web:5a6985f50f52c7fe7888c9"
});

const messaging = firebase.messaging();