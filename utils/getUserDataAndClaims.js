import { doc, getDoc } from "firebase/firestore";
import { auth, fireDB } from "../firebase";

const getUserDataAndClaims = () =>
  auth.currentUser
    .getIdTokenResult()
    .then(({ claims }) => {
      const newUserId = claims.parent ? claims.user_id : claims.childId;
      const userDocRef = doc(fireDB, "users", newUserId);
      return Promise.all([getDoc(userDocRef), claims, newUserId]);
    })
    .then(([docSnap, claims, newUserId]) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        return { claims, userData, newUserId };
      }
      return { claims };
    })
    .catch((err) => err);

export default getUserDataAndClaims;
