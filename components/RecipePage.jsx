// import { useEffect } from "react";

import { Text, View, Image, StyleSheet, Button } from "react-native";

export const RecipePage = () => {
  // useEffect(() => {}, []);
  return (
    <View>
      <Image
        source={{
          width: 250,
          height: 250,
          uri: "https://spoonacular.com/recipeImages/1697787-556x370.jpg",
        }}
      />
      <text>Recipe Title</text>
      <text>Time to make: 20 mins</text>
      <text>Ingredients</text>
      <text>Instructions</text>
      <Button title="add recipe to voting list" />
    </View>
  );
};

// recipe title
// ingredients
// instructions
