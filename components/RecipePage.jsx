import { useEffect } from "react";
import GetRecipe from "../api/GetRecipe";
import { Text, View } from "react-native";

export const RecipePage = () => {
  useEffect(() => {
    GetRecipe().then((result) => {
      console.log(result);
    });
  }, []);
  return (
    <View>
      <Text>Recipe page</Text>
    </View>
  );
};

// recipe title
// ingredients
// instructions
