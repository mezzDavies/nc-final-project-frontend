const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// To use firebase functions:
// Import { fireFunctions } from "../../firebase"
// Import { httpsCallabale } from "firebase/functions"

// Declare first: const (function-name) = httpsCallable(fireFunctions, "(functions-name)");

// Return function, invoked with an object containing correct keys. E.G 'addParentClaim' accesses 'data.email' so the object needs to contain a key-value pair with key 'email' and value of the user's email.
// E.G: return addParentClaim({ email: (users-email-string) });

exports.addParentClaim = functions.https.onCall((data) =>
  admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) =>
      admin.auth().setCustomUserClaims(user.uid, { parent: true })
    )
    .then(() => ({
      message: `Success! ${data.email} has been set as a parent.`,
    }))
    .catch((err) => err)
);
