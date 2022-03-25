import {
  arrayUnion,
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

// import app from "../firebase";
import { fireDB } from "../firebase";

async function createChildAccount(familyId, firstName) {
  const familyRef = doc(fireDB, "families", familyId);
  const familyDocSnap = await getDoc(familyRef);

  const parentIds = familyDocSnap.familyMembers.filter(async (userId) => {
    const parentRef = doc(fireDB, "users", userId);
    const parentDocSnap = await getDoc(parentRef);
    return parentDocSnap.isParent === true;
  });

  const childDocRef = await addDoc(collection(fireDB, "users"), {
    name: firstName,
    parentsIds: parentIds,
    familyId: [familyId],
  });

  parentIds.forEach(async (docId) => {
    const parentDocRef = doc(fireDB, "users", docId);
    await setDoc(
      parentDocRef,
      {
        children: {
          [familyId]: arrayUnion(childDocRef.id),
        },
      },
      { merge: true }
    );
  });

  await setDoc(familyRef, {
    familyMembers: arrayUnion[childDocRef.id],
  });

  return childDocRef.id;
}

export default createChildAccount;
