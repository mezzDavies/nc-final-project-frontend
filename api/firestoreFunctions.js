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
  Timestamp,
  updateDoc,
} from "firebase/firestore";

// import app from "../firebase";
import { fireDB } from "../firebase";

async function getRecipes() {
  const querySnapshot = await getDocs(collection(fireDB, "recipes"));
  const result = {};
  result.recipeCards = [];

  querySnapshot.forEach((recipe) => {
    result.recipeCards.push(recipe.data());
  });

  return result;
}

// Get an individual recipe from the db
// Returns an object with properties summary & ingredients

async function getRecipeById(recipeId) {
  const recipeIdAsStr = recipeId.toString();
  const docRef = doc(fireDB, "recipes", recipeIdAsStr);
  const collectionRef = collection(
    fireDB,
    `recipes/${recipeIdAsStr}/ingredients`
  );
  const result = {};
  result.ingredients = [];

  const querySnapshots = await Promise.all([
    getDoc(docRef),
    getDocs(collectionRef),
  ]);

  result.summary = querySnapshots[0].data();

  querySnapshots[1].forEach((ingredient) => {
    result.ingredients.push(ingredient.data());
  });

  return result;
}

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

// Creates a new selectionList for a family
// At the moment we should only allow one per family
// This could be created automatically when a user creates the family

async function addSelectionList(familyId) {
  const docRef = await addDoc(
    collection(fireDB, `families/${familyId}/selectionLists`),
    {
      listName: "Dinner",
      isActive: true,
      recipeIds: [],
      createdAt: Timestamp.fromDate(new Date()),
    }
  );
  console.log("selectionList: ", docRef.id, "familyId ", familyId);
  return docRef.id;
}

// We can probably allow users to delete a selection list as it won't have any sub-collections
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

async function deleteSelectionList(familyId, selectionListId) {
  await deleteDoc(
    doc(fireDB, `families/${familyId}/selectionLists`, selectionListId)
  );
  console.log("selecton list removed: ", selectionListId);
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
    console.log("Document data:", docSnap.get("recipeIds"));
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

// Create a new shortList for the current user
// This is probably best triggered as an admin function when a user is added to a group

async function addShortList(userId, familyId, selectionListId) {
  const d = new Date();
  d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7));
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);

  const docRef = await addDoc(
    collection(fireDB, `users/${userId}/shortLists`),
    {
      familyId,
      selectionListId,
      isConfirmed: false,
      recipeIds: [],
      weekStarting: d,
      createdAt: Timestamp.fromDate(new Date()),
    }
  );
  console.log("ShortListId: ", docRef.id);
  return docRef.id;
}

async function deleteShortList(userId, shortListId) {
  await deleteDoc(doc(fireDB, `users/${userId}/shortLists`, shortListId));
  console.log("short list removed: ", shortListId);
}

// View the current RecipeIds in a shortList
// You can then call getRecipesById to view recipe details

async function getShortList(userId, shortListId) {
  const docRef = doc(fireDB, `users/${userId}/shortLists`, shortListId);
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
async function addToShortList(userId, shortListId, recipeId) {
  const docRef = doc(fireDB, `users/${userId}/shortLists`, shortListId);

  await updateDoc(docRef, {
    recipeIds: arrayUnion(recipeId),
  });
  console.log("Added - shortList: ", docRef.id, "recipeId: ", recipeId);

  return docRef.id;
}

// Deletes a recipeId from a shortList
async function deleteFromShortList(userId, shortListId, recipeId) {
  const docRef = doc(fireDB, `users/${userId}/shortLists`, shortListId);

  await updateDoc(docRef, {
    recipeIds: arrayRemove(recipeId),
  });
  console.log("Deleted - shortList: ", docRef.id, "recipeId: ", recipeId);

  return docRef.id;
}

// Order shortList (prioritise)
// allow isConfrmed to be set to true (but not changed back to false)
async function orderShortList(userId, shortListId, recipeIds, isConfirmed) {
  const params = _.pickBy({ recipeIds, isConfirmed }, (value) => !!value);

  const docRef = doc(fireDB, `users/${userId}/shortLists`, shortListId);

  await updateDoc(docRef, params);

  return docRef.id;
}

// Creates a new selectionList for a family
// At the moment we should only allow one per family
// This could be created automatically when a user creates the family

async function addMealPlan(familyId) {
  const start = new Date();
  start.setDate(start.getDate() + ((((7 - start.getDay()) % 7) + 1) % 7));
  start.setHours(0);
  start.setMinutes(0);
  start.setSeconds(0);

  const end = new Date();
  end.setDate(start.getDate() + 7);

  const open = new Date();
  open.setDate(start.getDate() - 7);

  const close = new Date();
  close.setDate(start.getDate() - 2);

  const docRef = await addDoc(
    collection(fireDB, `families/${familyId}/mealPlans`),
    {
      isConfirmed: false,
      recipeIds: [],
      weekStarting: start,
      processLength: end,
      processOpen: open,
      processClose: close,
      createdAt: Timestamp.fromDate(new Date()),
    }
  );
  console.log("mealPlanId: ", docRef.id, "familyId ", familyId);
  return docRef.id;
}

async function deleteMealPlan(familyId, mealPlanId) {
  await deleteDoc(doc(fireDB, `families/${familyId}/mealPlans`, mealPlanId));
  console.log("meal plan removed: ", mealPlanId);
}

// View a meal plan
// You can then call getRecipesById to view recipe details

async function getMealPlan(familyId, mealPlanId) {
  const docRef = doc(fireDB, `families/${familyId}/mealPlans`, mealPlanId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.get("recipeIds"));
    return docSnap.data();
  }
  // doc.data() will be undefined in this case
  console.log("No such document!");
  return undefined;
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
  addFamily,
  updateFamilyName,
  addMealPlan,
  addSelectionList,
  addShortList,
  addToSelectionList,
  addToShortList,
  addUserToFamily,
  calculateShoppingList,
  deleteMealPlan,
  deleteSelectionList,
  deleteFromSelectionList,
  deleteFromShortList,
  deleteShortList,
  getFamily,
  getMealPlan,
  getRecipes,
  getRecipeById,
  getSelectionList,
  getShortList,
  listenFamily,
  listenSelectionList,
  orderShortList,
  removeUserFromFamily,
  toggleFamilyStatus,
  toggleSelectionListStatus,
};
