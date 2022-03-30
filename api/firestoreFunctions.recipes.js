import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

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

// Get and individual recipe for use with selectionList recipeCards
async function getRecipeCardById(recipeId) {
  const recipeIdAsStr = recipeId.toString();
  const docRef = doc(fireDB, "recipes", recipeIdAsStr);

  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    console.log("No such document!");
    return undefined;
  }

  return docSnap.data();
}

// Perhaps this might be a more efficient query than multiple queries to getRecipeCardById()
// pass it an array of recipeIds

async function getRecipeCardsById(arrOfRecipeIds) {
  const collectionRef = collection(fireDB, `recipes/`);

  const q = query(collectionRef, where("id", "in", arrOfRecipeIds));

  const querySnapshot = await getDocs(q);

  const result = [];

  querySnapshot.forEach((recipe) => {
    result.push(recipe.data());
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

export { getRecipes, getRecipeCardById, getRecipeCardsById, getRecipeById };
