// lib/notifcation/mobile.js
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// initialize firebase admin

// send mobile notification on new offer
