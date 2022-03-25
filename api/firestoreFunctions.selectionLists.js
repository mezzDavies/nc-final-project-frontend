// lodash
import _ from "lodash";

import {
  arrayRemove,
  arrayUnion,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  runTransaction,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getFamily } from "./firestoreFunctions.families";
import { addMealPlan } from "./firestoreFunctions.mealPlans";
import { addShortList } from "./firestoreFunctions.shortLists";


// import app from "../firebase";
import { fireDB } from "../firebase";

// Might be more descriptive to change selectionList to scranPlan then add selectionList as a field
// Creates a new selectionList for a family
// At the moment we should only allow one per family
// This could be created automatically when a user creates the family

async function addSelectionList(familyId) {
  // this needs to get made into a utility
  const start = new Date();
  start.setDate(start.getDate() + ((((7 - start.getDay()) % 7) + 1) % 7));
  start.setHours(0);
  start.setMinutes(0);
  start.setSeconds(0);

  // const end = new Date();
  // end.setDate(start.getDate() + 7);

  // const open = new Date();
  // open.setDate(start.getDate() - 7);

  // const close = new Date();
  // close.setDate(start.getDate() - 2);

  const docRef = await addDoc(
    collection(fireDB, `families/${familyId}/selectionLists`),
    {
      createdAt: Timestamp.fromDate(new Date()),
      listName: "Dinner",
      isActive: true,
      startDate: start,
      planLength: 7,
      planOpen: -7,
      planConfirm: -2,
      recipeIds: [],
    }
  );
  console.log("scranPlan: ", docRef.id, "familyId ", familyId);
  return docRef.id;
}

async function addScranPlan(familyId) {
  try {
    await runTransaction(fireDB, async () => {
      const familyDoc = await getFamily(familyId);
      const selectionListRef = await addSelectionList(familyId);
      const mealPlanRef = await addMealPlan(familyId, selectionListRef);
      await familyDoc.family.familyMembers.forEach((member) => {
        addShortList(member, familyId, selectionListRef, mealPlanRef);
      });
      console.log("did it work!");
    });
  } catch (e) {
    console.error(e);
  }
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

// I need to check the format to submit a new start date
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

  const docRef = doc(
    fireDB,
    `families/${familyId}/selectionLists`,
    selectionListId
  );

  await updateDoc(docRef, params);

  return docRef.id;
}

// Admin function only
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

  const querySnapshot = await getDocs(collectionRef);
  querySnapshot.forEach((selectionList) => {
    console.log(
      selectionList.id,
      " => ",
      selectionList.get("listName"),
      ": ",
      selectionList.get("startDate").toDate()
    );
  });
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
    console.log("Scran plan selection list: ", docSnap.get("recipeIds"));
    console.log("Scran plan: ", docSnap.data());
    return docSnap.data();
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
  addScranPlan,
  updateSelectionListName,
  updateSelectionListSchedule,
  addSelectionList,
  addToSelectionList,
  deleteSelectionList,
  deleteFromSelectionList,
  getSelectionList,
  getSelectionLists,
  listenSelectionList,
  toggleSelectionListStatus,
};
