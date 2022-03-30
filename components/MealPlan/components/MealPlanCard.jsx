import React from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { useState } from "react";

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

  const styles = StyleSheet.create({
    dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
    dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
    dropdown1RowStyle: {
      backgroundColor: "#EFEFEF",
      borderBottomColor: "#C5C5C5",
    },
    dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
    dropdownsRow: {
      flexDirection: "row",
      width: "100%",
      paddingHorizontal: "5%",
    },
  });

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

  console.log(mealPlan);
  // console.log(id);
  // console.log(setMealPlan);

  return (
    <View>
      <Text>{weekDays[index]}</Text>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("MealPlanRecipePage", { id });
        }}
      >
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      </TouchableHighlight>
      <Text>{`${title}`}</Text>
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
