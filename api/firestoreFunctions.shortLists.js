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
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

// import app from "../firebase";
import { fireDB } from "../firebase";

// Create a new shortList for the current user
// This is probably best triggered as an admin function when a user is added to a group

async function addShortList(userId, familyId, selectionListId, mealPlanId) {
  const docRef = await addDoc(
    collection(
      fireDB,
      `/families/${familyId}/selectionLists/${selectionListId}/mealPlans/${mealPlanId}/shortLists`
    ),
    {
      createdAt: Timestamp.fromDate(new Date()),
      isConfirmed: false,
      userId,
      familyId,
      selectionListId,
      mealPlanId,
      recipeIds: [],
    }
  );
  console.log("ShortListId: ", docRef.id);
  return docRef.id;
}

async function deleteShortList(
  userId,
  familyId,
  selectionListId,
  mealPlanId,
  shortListId
) {
  await deleteDoc(
    doc(
      fireDB,
      `/families/${familyId}/selectionLists/${selectionListId}/mealPlans/${mealPlanId}/shortLists`,
      shortListId
    )
  );
  console.log("short list removed: ", shortListId);
}

async function getShortLists(userId, familyId, selectionListId, mealPlanId) {
  const q = query(
    collection(
      fireDB,
      `/families/${familyId}/selectionLists/${selectionListId}/mealPlans/${mealPlanId}/shortLists`
    ),
    where("userId", "==", userId)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((shortList) => {
    console.log("shortListId: ", shortList.id);
  });
}

// View the current RecipeIds in a shortList
// You can then call getRecipesById to view recipe details

async function getShortList(
  userId,
  familyId,
  selectionListId,
  mealPlanId,
  shortListId
) {
  const docRef = doc(
    fireDB,
    `/families/${familyId}/selectionLists/${selectionListId}/mealPlans/${mealPlanId}/shortLists`,
    shortListId
  );
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.get("recipeIds"));
    return docSnap.data();
  }
  // doc.data() will be undefined in this case
  console.log("No such document!");
  return undefined;
}

// Adds a recipeId to a shortList
// this should be limited to 7 recipes
async function addToShortList(
  userId,
  familyId,
  selectionListId,
  mealPlanId,
  shortListId,
  recipeId
) {
  const docRef = doc(
    fireDB,
    `/families/${familyId}/selectionLists/${selectionListId}/mealPlans/${mealPlanId}/shortLists`,
    shortListId
  );

  await updateDoc(docRef, {
    recipeIds: arrayUnion(recipeId),
  });
  console.log("Added - shortList: ", docRef.id, "recipeId: ", recipeId);

  return docRef.id;
}

// Deletes a recipeId from a shortList
async function deleteFromShortList(
  userId,
  familyId,
  selectionListId,
  mealPlanId,
  shortListId,
  recipeId
) {
  const docRef = doc(
    fireDB,
    `/families/${familyId}/selectionLists/${selectionListId}/mealPlans/${mealPlanId}/shortLists`,
    shortListId
  );

  await updateDoc(docRef, {
    recipeIds: arrayRemove(recipeId),
  });
  console.log("Deleted - shortList: ", docRef.id, "recipeId: ", recipeId);

  return docRef.id;
}

// Order shortList (prioritise)
// allow isConfrmed to be set to true (but not changed back to false)
async function orderShortList(
  userId,
  familyId,
  selectionListId,
  mealPlanId,
  shortListId,
  recipeIds,
  isConfirmed
) {
  const params = _.pickBy({ recipeIds, isConfirmed }, (value) => !!value);

  const docRef = doc(
    fireDB,
    `/families/${familyId}/selectionLists/${selectionListId}/mealPlans/${mealPlanId}/shortLists`,
    shortListId
  );

  await updateDoc(docRef, params);

  return docRef.id;
}

export {
  addShortList,
  addToShortList,
  deleteFromShortList,
  deleteShortList,
  getShortList,
  getShortLists,
  orderShortList,
};
