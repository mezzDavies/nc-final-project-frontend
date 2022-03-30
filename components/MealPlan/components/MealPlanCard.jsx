import React from "react";
import { View, Text, TouchableHighlight, Image } from "react-native";

const MealPlanCard = ({ recipe, navigation }) => {
  const { id, image, instructions, readyInMinutes, servings, summary, title } =
    recipe;
  return (
    <View>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("MealPlanRecipePage", { id });
        }}
      >
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      </TouchableHighlight>
      <Text>{`${title}`}</Text>
    </View>
  );
};

export default MealPlanCard;
