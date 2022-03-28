const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// To use firebase functions:
// Import { fireFunctions } from "../../firebase"
// Import { httpsCallabale } from "firebase/functions"

// Declare first: const (function-name) = httpsCallable(fireFunctions, "(functions-name)");

// Return function, invoked with an object containing correct keys. E.G 'addParentClaim' accesses 'data.email' so the object needs to contain a key-value pair with key 'email' and value of the user's email.
// Code example: return addParentClaim({ email: (users-email-string) });

exports.addParentClaim = functions.https.onCall((data) => {
  return admin.auth().getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, { parent: true })
    })
    .then(() => {
      return {
        message: `Successfully added user as a parent`,
      }
    })
    .catch((err) => err);
})

exports.switchToChildAccount = functions.https.onCall((data, context) => {
  const {uid} = context.auth;
  const {childId} = data;
  return admin
    .auth()
    .getUser(uid)
    .then((user) => admin
        .auth()
        .setCustomUserClaims(user.uid, { parent: false, childId }))
    .then(() => ({
        message: `Successfully switched to child account`,
      }))
    .catch((err) => err);
});

exports.switchToParentAccount = functions.https.onCall((data, context) => {
  const {uid} = context.auth;
  return admin
    .auth()
    .getUser(uid)
    .then((user) => admin
        .auth()
        .setCustomUserClaims(user.uid, { parent: true, childId: null }))
    .then(() => ({
        message: `Successfully switched to parent account`,
      }))
    .catch((err) => err);
});
