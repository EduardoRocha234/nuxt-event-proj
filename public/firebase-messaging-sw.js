importScripts('https://www.gstatic.com/firebasejs/11.0.1/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging-compat.js')

firebase.initializeApp({
    apiKey: "AIzaSyBfPp6TxFXzGNej00yHppGif8UVQKKg-WQ",
    authDomain: "message-teste-7cc85.firebaseapp.com",
    projectId: "message-teste-7cc85",
    storageBucket: "message-teste-7cc85.appspot.com",
    messagingSenderId: "702029751259",
    appId: "1:702029751259:web:456a6fc512124b754c3dfe",
    measurementId: "G-G4PV0YPFZB"
});

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});