import { doc, getDoc } from "firebase/firestore";
import { auth, fireDB } from "../firebase";

const getUserDataAndClaims = async () => {
  try{
    await auth.currentUser.getIdToken(true);
    const { claims } = await auth.currentUser.getIdTokenResult()
    console.log(claims)
    let newUserId;
    if(claims.parent === false) {
      newUserId = claims.childId
    } else {
      newUserId = claims.user_id
    }
    const userDocRef = doc(fireDB, "users", newUserId);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      return { claims, userData, newUserId };
    }
    return { claims };
  } catch(err) {
    return err
  }
}

export default getUserDataAndClaims;
