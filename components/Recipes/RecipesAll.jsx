import { ScrollView } from "react-native";
import React from "react";
import RecipesList from "./components/RecipesList";

const RecipesAll = ({ navigation }) => {
  return (
    <ScrollView>
      <RecipesList navigation={navigation} />
    </ScrollView>
  );
};

export default RecipesAll;
