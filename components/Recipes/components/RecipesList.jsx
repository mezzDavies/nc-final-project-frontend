import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { getRecipes } from "../../../api/firestoreFunctions.recipes";
import RecipeCard from "./RecipeCard";
import styles from "./Styles";

const RecipesList = ({ navigation }) => {
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
  }, []);

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View style={styles.recipes}>
      <Text style={styles.tagLine}>
        Click on a meal you like to see the ingredients and method for
        cooking...
      </Text>
      {recipesList.map((recipe, index) => {
        return (
          <RecipeCard
            recipe={recipe}
            navigation={navigation}
            key={`${recipe.id} - ${index}`}
          />
        );
      })}
    </View>
  );
};

export default RecipesList;
