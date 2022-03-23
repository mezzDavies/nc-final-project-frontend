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
  // const recipeRef = doc(db, `recipes/${recipeId}`);
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
  // const recipeRef = doc(db, `recipes/${recipeId}`);
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
  addFamily,
  addSelectionList,
  addToSelectionList,
  addUserToFamily,
  deleteSelectionList,
  deleteFromSelectionList,
  getRecipes,
  getRecipeById,
  getSelectionList,
  listenSelectionList,
  removeUserFromFamily,
  toggleFamilyStatus,
};
