import { collection, doc, getDoc, getDocs } from "firebase/firestore";

// import app from "../firebase";
import { fireDB } from "../firebase";

async function getRecipes() {
  const recipesRef = collection(fireDB, "recipes");
  // const q = query(recipesRef, where("regions", "array-contains", "west_coast"));

  const result = {};
  result.recipeCards = [];

  const snapshots = await getDocs(recipesRef);

  snapshots.forEach((recipe) => {
    result.recipeCards.push(recipe.data());
  });

  return result;
}

async function getRecipeById(recipeId) {
  const recipeRef = doc(fireDB, "recipes", recipeId);
  const ingredientsRef = collection(fireDB, `recipes/${recipeId}/ingredients`);
  const result = {};
  result.ingredients = [];

  const snapshots = await Promise.all([
    getDoc(recipeRef),
    getDocs(ingredientsRef),
  ]);

  result.summary = snapshots[0].data();

  snapshots[1].forEach((ingredient) => {
    result.ingredients.push(ingredient.data());
  });

  return result;
}

export { getRecipes, getRecipeById };
