const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.addParentRole = functions.https.onCall((data) => admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => admin.auth().setCustomUserClaims(user.uid, { parent: true }))
    .then(() => ({
        message: `Success! ${data.email} has been set as a parent.`,
      }))
    .catch((err) => err));
