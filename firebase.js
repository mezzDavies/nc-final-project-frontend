import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyA1GRoF2RBTeos9kFAanK0EBhRutqGG31Y",
  authDomain: "planet-scran-it.firebaseapp.com",
  projectId: "planet-scran-it",
  storageBucket: "planet-scran-it.appspot.com",
  messagingSenderId: "201508538980",
  appId: "1:201508538980:web:d5917bd035af24d06a6d71",
});

export const fireDB = getFirestore(app);
export const auth = getAuth(app);
export default app;
