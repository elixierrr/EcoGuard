const admin = require("firebase-admin");
const serviceAccount = require("../path/to/serviceAccountKey.json"); // Tambahkan file kunci Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<project-id>.firebaseio.com",
});

const db = admin.firestore();
module.exports = db;
