// lodash
import _ from "lodash";

import {
  arrayRemove,
  arrayUnion,
  addDoc,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

// import app from "../firebase";
import { fireDB } from "../firebase";

// Creates a new selectionList document for a family
// Don't use this function directly.
// It is used by addScranPlan() as part of a transaction.

async function addSelectionList(familyId) {
  // Uses the current local time to set the scran plan start date to 0000 on the next Monday.
  function setStartDate() {
    const start = new Date();
    start.setDate(start.getDate() + ((((7 - start.getDay()) % 7) + 1) % 7));
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    return start;
  }

  const start = setStartDate();

  const docRef = await addDoc(
    collection(fireDB, `families/${familyId}/selectionLists`),
    {
      createdAt: Timestamp.fromDate(new Date()),
      listName: "Dinner",
      isActive: true,
      startDate: Timestamp.fromDate(start),
      planLength: 7,
      planOpen: -7,
      planConfirm: -2,
      recipeIds: [],
    }
  );
  return docRef.id;
}

async function updateSelectionListName(familyId, selectionListId, newListName) {
  const docRef = doc(
    fireDB,
    `families/${familyId}/selectionLists`,
    selectionListId
  );

  await updateDoc(docRef, {
    listName: newListName,
  });

  return docRef.id;
}

// We can't let users delete a selection list as it has sub-collections
// However setting a flag could hide it from other member of the group until admin re-activates it

async function toggleSelectionListStatus(familyId, selectionListId) {
  const docRef = doc(
    fireDB,
    `families/${familyId}/selectionLists`,
    selectionListId
  );
  const currIsActive = (await getDoc(docRef)).get("isActive");

  await updateDoc(docRef, {
    isActive: !currIsActive,
  });

  return !currIsActive;
}

// Update the schedule fields of a scranPlan
// startDate needs to be in a recognized javascript format e.g. date object
// pass null or undefined to any field that doesn't need to be updated
// the _.pickBy function should then strip it out from the final request.

async function updateSelectionListSchedule(
  familyId,
  selectionListId,
  startDate,
  planLength,
  planOpen,
  planConfirm
) {
  const params = _.pickBy(
    { startDate, planLength, planOpen, planConfirm },
    (value) => !!value
  );

  if (params.startDate) {
    params.startDate = Timestamp.fromDate(startDate);
  }

  const docRef = doc(
    fireDB,
    `families/${familyId}/selectionLists`,
    selectionListId
  );

  await updateDoc(docRef, params);

  return docRef.id;
}

// Admin function only - will be removed
// set isActive: false instead using toggleSelectionListStatus()
async function deleteSelectionList(familyId, selectionListId) {
  await deleteDoc(
    doc(fireDB, `families/${familyId}/selectionLists`, selectionListId)
  );
  console.log("selection list removed: ", selectionListId);
}

// Get all selectionLists for a family

async function getSelectionLists(familyId) {
  const collectionRef = collection(
    fireDB,
    `families/${familyId}/selectionLists`
  );
  const selectionLists = [];
  const querySnapshot = await getDocs(collectionRef);
  querySnapshot.forEach((selectionList) => {
    if (selectionList.get("isActive") === true) {
      selectionLists.push(selectionList.id);
    }
  });
  return selectionLists;
}

// View the current RecipeRefs in a selectionList
// You can then call getRecipesById to view recipe details

async function getSelectionList(familyId, selectionListId) {
  const docRef = doc(
    fireDB,
    `families/${familyId}/selectionLists`,
    selectionListId
  );
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.get("recipeIds");
  }
  // doc.data() will be undefined in this case
  console.log("No such document!");
  return undefined;
}

// Setup a listener on the selectionList
async function listenSelectionList(familyId, selectionListId) {
  const docListener = onSnapshot(
    doc(fireDB, `families/${familyId}/selectionLists`, selectionListId),
    (selectionList) => {
      // console.log("selectionList: ", doc.id(), "current data: ", doc.data());
      console.log(
        "Current recipeIds from selectionList: ",
        selectionList.get("recipeIds")
      );
    }
  );
  return docListener;
}

// Adds a recipeId to a selectionList
async function addToSelectionList(familyId, selectionListId, recipeId) {
  const docRef = doc(
    fireDB,
    `families/${familyId}/selectionLists`,
    selectionListId
  );

  await updateDoc(docRef, {
    recipeIds: arrayUnion(recipeId),
  });

  console.log("Added - selectionList: ", docRef.id, "recipeId: ", recipeId);

  return docRef.id;
}

// Delete a recipeId from a selectionList
// async function deleteFromSelectionList(familyId, selectionListId, recipeId) {
//   const shortListsQuery = query(
//     collectionGroup(fireDB, "shortLists"),
//     where("familyId", "==", familyId),
//     where("recipeIds", "array-contains", recipeId)
//   );
//   const result = [];
//   const querySnapshot = await getDocs(shortLists);
//   querySnapshot.forEach((doc) => {
//     result.push(doc.data());
//   });

//   if (result.length > 0) {
//     console.log("cannot delete as recipeId is in a family members short list");
//     return undefined;
//   }
//   if (result.length === 0) {
//   console.log("results returned: ", result.length);
//   const docRef = doc(
//     fireDB,
//     `families/${familyId}/selectionLists`,
//     selectionListId
//   );

// Delete a recipeId from a selectionList
async function deleteFromSelectionList(familyId, selectionListId, recipeId) {
  const docRef = doc(
    fireDB,
    `families/${familyId}/selectionLists`,
    selectionListId
  );

  await updateDoc(docRef, {
    recipeIds: arrayRemove(recipeId),
  });

  console.log("Deleted - selectionList: ", docRef.id, "recipeId: ", recipeId);

  return docRef.id;
}

export {
  addSelectionList,
  addToSelectionList,
  deleteSelectionList,
  deleteFromSelectionList,
  getSelectionList,
  getSelectionLists,
  listenSelectionList,
  toggleSelectionListStatus,
  updateSelectionListName,
  updateSelectionListSchedule,
};
