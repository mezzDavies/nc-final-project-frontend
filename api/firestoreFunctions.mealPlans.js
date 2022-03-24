// lodash
// import _ from "lodash";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

// import app from "../firebase";
import { fireDB } from "../firebase";

// Creates a new mealPlan for a family
// At the moment we should only allow one per family
// This could be created automatically when a user creates the family

async function addMealPlan(familyId, selectionListId) {
  const docRef = await addDoc(
    collection(
      fireDB,
      `families/${familyId}/selectionLists/${selectionListId}/mealPlans`
    ),
    {
      createdAt: Timestamp.fromDate(new Date()),
      isConfirmed: false,
      recipeIds: [],
      shoppingList: [],
    }
  );
  console.log(
    "mealPlanId: ",
    docRef.id,
    "familyId ",
    familyId,
    "selectionListId ",
    selectionListId
  );
  return docRef.id;
}

// For admin use only
async function deleteMealPlan(familyId, selectionListId, mealPlanId) {
  await deleteDoc(
    doc(
      fireDB,
      `families/${familyId}/selectionLists/${selectionListId}/mealPlans`,
      mealPlanId
    )
  );
  console.log("meal plan removed: ", mealPlanId);
}

// Deleting a document and all its sub-collections is an admin task.
// If we set an isActive flag to false we can schedule account deletion as an admin task.
// E.g. any groups inactive for more than time x should be deleted

async function toggleMealPlanStatus(familyId, selectionListId, mealPlanId) {
  const docRef = doc(
    fireDB,
    `families/${familyId}/selectionLists/${selectionListId}/mealPlans`,
    mealPlanId
  );
  const currIsConfirmed = (await getDoc(docRef)).get("isConfirmed");

  await updateDoc(docRef, {
    isConfirmed: !currIsConfirmed,
  });

  return !currIsConfirmed;
}

// View a meal plan
// You can then call getRecipesById to view recipe details

async function getMealPlan(familyId, selectionListId, mealPlanId) {
  const docRef = doc(
    fireDB,
    `families/${familyId}/selectionLists/${selectionListId}/mealPlans`,
    mealPlanId
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

async function calculateVotes(familyId, selectionListId, mealPlanId) {
  const allUsersVotes = [];

  const querySnapshot = await getDocs(
    collection(
      fireDB,
      `families/${familyId}/selectionLists/${selectionListId}/mealPlans/${mealPlanId}/shortLists`
    )
  );

  await querySnapshot.forEach((shortList) => {
    const votes = [];
    if (shortList.isConfirmed) {
      shortList.recipeIds.forEach((recipeId, index) => {
        const item = { [recipeId]: index };
        votes.push(item);
      });
    }
    const usersVotes = { [shortList.shortListId]: votes };
    allUsersVotes.push(usersVotes);
  });

  return allUsersVotes;
}

async function calculateShoppingList(recipeIds) {
  const shoppingList = [];

  const results = await recipeIds.map((recipeId) =>
    getDocs(collection(fireDB, `recipes/${recipeId}/ingredients`))
  );

  const querySnapshots = await Promise.all(results);

  await querySnapshots.forEach((ings) => {
    ings.forEach((ing) => {
      const item = {};
      item.name = ing.get("name");
      item.amount = ing.get("amount");
      item.unit = ing.get("unit");
      shoppingList.push(item);
    });
    console.log(shoppingList);
  });
  return shoppingList;
  // const q = query(collection(fireDB, "recipes"), where("id", "in", recipeIds));
}

export {
  addMealPlan,
  calculateShoppingList,
  calculateVotes,
  deleteMealPlan,
  getMealPlan,
  toggleMealPlanStatus,
};
