import React from "react";
import { View, ScrollView } from "react-native";
import MealPlanList from "./components/MealPlanList";

const MealPlanScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View>
        <MealPlanList navigation={navigation} />
      </View>
    </ScrollView>
  );
};

export default MealPlanScreen;
