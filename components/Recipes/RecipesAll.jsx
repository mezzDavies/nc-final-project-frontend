import { ScrollView } from "react-native";
import React from "react";
import RecipesList from "./components/RecipesList";

const RecipesAll = () => {
  return (
    <ScrollView>
      <RecipesList />
    </ScrollView>
  );
};

export default RecipesAll;
