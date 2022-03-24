import { doc, getDoc } from "firebase/firestore";
import { auth, fireDB } from "../firebase";

const getUserDataAndClaims = () => auth.currentUser
    .getIdTokenResult()
    .then(({ claims }) => {
      const userDocRef = doc(fireDB, "users", claims.user_id);
      return Promise.all([getDoc(userDocRef), claims]);
    })
    .then(([docSnap, claims]) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        return { claims, userData };
      } 
        return { claims };
      
    })
    .catch((err) => err);

export default getUserDataAndClaims;
