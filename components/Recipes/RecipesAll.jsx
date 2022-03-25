import { Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import RecipesList from "./RecipesList";

const RecipesAll = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <ScrollView>
      <RecipesList />
    </ScrollView>
  );
};

export default RecipesAll;
