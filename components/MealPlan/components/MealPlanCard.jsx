import React from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
} from "react-native";
import SelectDropdown from "../../SelectDropdown/src/SelectDropdown";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import styles from "./MealPlanStyling";

const MealPlanCard = ({
  recipe,
  navigation,
  index,
  mealPlan,
  setMealPlan,
  setSettingDays,
}) => {
  const { id, image, instructions, readyInMinutes, servings, summary, title } =
    recipe;

  const [selectedDay, setSelectedDay] = useState();

  let position = index;

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  function arrayMove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
    return arr;
  }

  return (
    <View style={styles.recipe}>
      <Text style={styles.weekdayTitle}>{weekDays[index]}</Text>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("MealPlanRecipePage", { id });
        }}
      >
        <Image source={{ uri: image }} style={styles.image} />
      </TouchableHighlight>
      <Text style={(styles.recipeInfo, styles.recipeTitle)}>{`${title}`}</Text>
      <View>
        <Picker
          selectedValue={selectedDay}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedDay(itemValue);
            const recipeIndex = mealPlan.findIndex((recipe) => recipe == id);
            setMealPlan(arrayMove(mealPlan, recipeIndex, itemIndex));
            setSettingDays((currentSettingDays) => !currentSettingDays);
          }}
        >
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
          <Picker.Item label="Saturday" value="Saturday" />
          <Picker.Item label="Sunday" value="Sunday" />
        </Picker>
      </View>
      <Text style={styles.dividingLine} />
    </View>
  );
};

export default MealPlanCard;

//current index of meal
//index of the day they want it on

//onSelect of dropdown returns index of selectedItem and index of selectedDay
//onSelect of confirm selection invokes arraymove and setMealPlan
