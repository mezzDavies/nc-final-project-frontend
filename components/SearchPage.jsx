import { Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import RecipesList from "./RecipesList";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <ScrollView>
      <RecipesList searchTerm={searchTerm} />
    </ScrollView>
  );
};

export default SearchPage;
