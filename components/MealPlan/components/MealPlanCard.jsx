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
      <Text>{weekDays[index]}</Text>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("MealPlanRecipePage", { id });
        }}
      >
        <Image source={{ uri: image }} style={styles.image} />
      </TouchableHighlight>
      <Text style={(styles.recipeInfo, styles.recipeTitle)}>{`${title}`}</Text>
      <View style={styles.dropdownsRow}>
        <SelectDropdown
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          dropdownIconPosition={"right"}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
          data={weekDays}
          onSelect={(selectedItem, index) => {
            const recipeIndex = mealPlan.findIndex((recipe) => recipe == id);
            setMealPlan(arrayMove(mealPlan, recipeIndex, index));
            setSettingDays((currentSettingDays) => !currentSettingDays);
          }}
        />
      </View>
    </View>
  );
};

export default MealPlanCard;

//current index of meal
//index of the day they want it on

//onSelect of dropdown returns index of selectedItem and index of selectedDay
//onSelect of confirm selection invokes arraymove and setMealPlan
