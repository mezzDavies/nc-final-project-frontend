import {
  arrayUnion,
  addDoc,
  updateDoc,
  collection,
  doc,
  getDoc,
} from "firebase/firestore";

import { fireDB } from "../firebase";

async function createChildAccount(familyId, firstName) {
  try {
    const familyRef = doc(fireDB, "families", familyId);
    const familyDocSnap = await getDoc(familyRef);

    const parentIdsPromises =
      await familyDocSnap._document.data.value.mapValue.fields.familyMembers.arrayValue.values.map(
        async ({ stringValue: userId }) => {
          const parentRef = doc(fireDB, "users", userId);
          const parentDocSnap = await getDoc(parentRef);
          if (
            parentDocSnap._document.data.value.mapValue.fields.isParent
              .booleanValue
          ) {
            return userId;
          }
          return undefined;
        }
      );

    const parentIds = await Promise.all(parentIdsPromises);
    const parentIdsFiltered = parentIds.filter(
      (element) => element !== undefined
    );

    const childDocRef = await addDoc(collection(fireDB, "users"), {
      name: firstName,
      parentsIds: parentIdsFiltered,
      groupIds: [familyId],
      isParent: false,
    });

    const childrenFieldForFamily = `children.${familyId}`;

    await parentIdsFiltered.forEach(async (docId) => {
      const parentDocRef = doc(fireDB, "users", docId);
      await updateDoc(
        parentDocRef,
        {
          [childrenFieldForFamily]: arrayUnion(childDocRef.id),
        },
        { merge: true }
      );
    });

    await updateDoc(familyRef, {
      familyMembers: arrayUnion(childDocRef.id),
    });

    return childDocRef.id;
  } catch (err) {
    return err;
  }
}

async function getNoncurrentUserData(userId) {
  try {
    const userRef = doc(fireDB, "users", userId);
    const userDocSnap = await getDoc(userRef);

    return userDocSnap.data();
  } catch (err) {
    return err;
  }
}

export { createChildAccount, getNoncurrentUserData };
