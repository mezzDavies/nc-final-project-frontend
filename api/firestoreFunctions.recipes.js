// lodash
// import _ from "lodash";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";

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

export { getRecipes, getRecipeById };
