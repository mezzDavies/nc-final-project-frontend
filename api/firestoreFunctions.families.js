import {
  arrayRemove,
  arrayUnion,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import addScranPlan from "../api/firestoreFunctions.scranPlan";

// import app from "../firebase";
import { fireDB } from "../firebase";

// Create a new family (group) within the families collection.
// At the moment it doesn't check that a group with the same name, familyId doesn't already exist
// We need to implement that before we go live. collectionGroups is the way to do it but we may need to restructure data

async function addFamily(userId, groupName) {
  const docRef = await addDoc(collection(fireDB, "families"), {
    createdAt: Timestamp.fromDate(new Date()),
    isActive: true,
    groupName,
    familyMembers: [userId],
  });

  const userDocRef = doc(fireDB, "users", userId);

  await updateDoc(userDocRef, {
    groupIds: arrayUnion(docRef.id),
  });

  return docRef.id;
}

// Update the family name

async function updateFamilyName(familyId, newGroupName) {
  const docRef = doc(fireDB, "families", familyId);

  await updateDoc(docRef, {
    groupName: newGroupName,
  });

  return docRef.id;
}

// Find out the familyId of the active (isActive: true) families a user belongs to:

async function getFamilies(userId) {
  const q = query(
    collection(fireDB, "families"),
    where("familyMembers", "array-contains", userId)
  );

  const families = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((family) => {
    if (family.get("isActive") === true) {
      families.push(family.id);
    }
  });

  return families;
}

// get family info and id of any active (isActive: true) scranPlans
// inactive scranPlan (isActive: false) are not returned

async function getFamily(familyId) {
  const docRef = doc(fireDB, "families", familyId);
  const collectionRef = collection(
    fireDB,
    `families/${familyId}/selectionLists`
  );
  const result = {};
  result.scranPlans = [];

  const querySnapshots = await Promise.all([
    getDoc(docRef),
    getDocs(collectionRef),
  ]);

  console.log(querySnapshots, 'querysnapshots')

  result.family = querySnapshots[0].data();

  console.log(result.family, 'familydata')

  querySnapshots[1].forEach((selectionList) => {
    if (selectionList.get("isActive") === true) {
      const list = {};
      list[selectionList.id] = selectionList.get("listName");
      result.scranPlans.push(list);
    }
  });

  console.log(result)

  return result;
};

// Setup a listener on the family members only, other info can be added if needed
async function listenFamily(familyId) {
  const docListener = onSnapshot(
    doc(fireDB, `families`, familyId),
    (family) => {
      family.data();
      console.log(family.get("familyMembers"));
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

// Add a user to a family
// If a user is already a family member they won't be added again.
// We probably need to make userId -> UserIdToAdd and include UserIdCurrent
// UserIdCurrent should be the currently logged in user.
// We should then check if they are a parent member in the group before allowing them to add a new user

async function addUserToFamily(userId, familyId) {
  const docRef = doc(fireDB, "families", familyId);

  await updateDoc(docRef, {
    familyMembers: arrayUnion(userId),
  });

  const userDocRef = doc(fireDB, "users", userId);

  await updateDoc(userDocRef, {
    groupIds: arrayUnion(docRef.id)
  })

  console.log("family member added: ", userId);
  return docRef.id;
}

// Delete a family member
// Same comments as above

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
  getFamilies,
  getFamily,
  listenFamily,
  removeUserFromFamily,
  toggleFamilyStatus,
};
