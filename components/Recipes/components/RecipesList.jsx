import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { getRecipes } from "../../../api/firestoreFunctions.recipes";
import RecipeCard from "./RecipeCard";
import styles from "./Styles";

const RecipesList = ({ navigation }) => {
  const [recipesList, setRecipesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    getRecipes()
      .then(({ recipeCards: recipes }) => {
        if (mounted) {
          setRecipesList(recipes);
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err));
    return () => (mounted = false);
  }, []);

  if (isLoading) return <Text></Text>;

  return (
    <View style={styles.recipes}>
      <Text style={styles.tagLine}>
        Click on a meal you like to find out more about each recipe...
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
