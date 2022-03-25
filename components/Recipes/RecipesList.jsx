import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { getRecipes } from "../../api/firestoreFunctions.recipes";
import RecipeCard from "./RecipeCard";

const RecipesList = (searchTerm) => {
  const [recipesList, setRecipesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getRecipes()
      .then(({ recipeCards: recipes }) => {
        setRecipesList(recipes);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [searchTerm]);

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View>
      {recipesList.map((recipe, index) => {
        return <RecipeCard recipe={recipe} key={`${recipe.id} - ${index}`} />;
      })}
    </View>
  );
};

export default RecipesList;
