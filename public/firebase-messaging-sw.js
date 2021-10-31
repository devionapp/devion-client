/* eslint-disable no-undef */

importScripts("http://www.gstatic.com/firebasejs/8.9.1/firebase-app.js");
importScripts("http://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyDwZg8lwGEIMp74DL7AfQBd6s7fX_RcjvQ",
  authDomain: "devion-30f06.firebaseapp.com",
  projectId: "devion-30f06",
  storageBucket: "devion-30f06.appspot.com",
  messagingSenderId: "840660513594",
  appId: "1:840660513594:web:d59a94ae7dfa8421f95603"
});
const messaging = firebase.messaging();
messaging.onBackgroundMessage(payload => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
