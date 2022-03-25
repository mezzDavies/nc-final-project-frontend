import React from "react";
import { View } from "react-native";
import MealPlanList from "./components/MealPlanList";

const MealPlanScreen = ({ navigation }) => {
  return (
    <View>
      <MealPlanList navigation={navigation} />
    </View>
  );
};

export default MealPlanScreen;
