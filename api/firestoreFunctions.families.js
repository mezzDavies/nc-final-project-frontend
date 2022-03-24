// lodash
// import _ from "lodash";

import {
  arrayRemove,
  arrayUnion,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

// import app from "../firebase";
import { fireDB } from "../firebase";

// Create a new family (group) within the families collection.
// At the moment it doesn't check that a group with the same name, familyId doesn't already exist
// We need to implement that before we go live. collectionGroups is the way to do it but we may need to restructure data

async function addFamily(userId, groupName) {
  const docRef = await addDoc(collection(fireDB, "families"), {
    groupName,
    isActive: true,
    familyMembers: [userId],
    createdAt: Timestamp.fromDate(new Date()),
  });

  return docRef.id;
}

async function updateFamilyName(familyId, newGroupName) {
  const docRef = doc(fireDB, "families", familyId);

  await updateDoc(docRef, {
    groupName: newGroupName,
  });

  return docRef.id;
}

async function getFamily(familyId) {
  const docRef = doc(fireDB, "families", familyId);
  const collectionRef = collection(
    fireDB,
    `families/${familyId}/selectionLists`
  );
  const result = {};
  result.selectionLists = [];

  const querySnapshots = await Promise.all([
    getDoc(docRef),
    getDocs(collectionRef),
  ]);

  result.family = querySnapshots[0].data();

  querySnapshots[1].forEach((selectionList) => {
    result.selectionLists.push(selectionList.data());
  });

  return result;
}

// Setup a listener on the family
async function listenFamily(familyId) {
  const docListener = onSnapshot(
    doc(fireDB, `families`, familyId),
    (family) => {
      // console.log("selectionList: ", doc.id(), "current data: ", doc.data());
      console.log("Current family members: ", family.get("familyMembers"));
    }
  );
  return docListener;
}

// Deleting a document and all its sub-collections is an admin task.
// If we set an isActive flag to false we can schedule account deletion as an admin task.
// E.g. any groups inactive for more than time x should be deleted

async function toggleFamilyStatus(familyId) {
  const docRef = doc(fireDB, "families", familyId);
  const currIsActive = (await getDoc(docRef)).get("isActive");

  await updateDoc(docRef, {
    isActive: !currIsActive,
  });

  return !currIsActive;
}

// Add a family member

async function addUserToFamily(userId, familyId) {
  const docRef = doc(fireDB, "families", familyId);

  await updateDoc(docRef, {
    familyMembers: arrayUnion(userId),
  });

  console.log("family member added: ", userId);
  return docRef.id;
}

// Delete a family member

async function removeUserFromFamily(userId, familyId) {
  const docRef = doc(fireDB, "families", familyId);

  await updateDoc(docRef, {
    familyMembers: arrayRemove(userId),
  });

  console.log("family member removed: ", userId);
  return docRef.id;
}

export {
  addFamily,
  updateFamilyName,
  addUserToFamily,
  getFamily,
  listenFamily,
  removeUserFromFamily,
  toggleFamilyStatus,
};
