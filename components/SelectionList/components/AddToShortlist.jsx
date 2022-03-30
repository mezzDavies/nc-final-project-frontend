import react from "react";
import { View } from "react-native";
import { useState, useEffect } from "react";
import {
  addToShortList,
  deleteFromShortList,
} from "../../../api/firestoreFunctions.shortLists";
import { TouchableOpacity } from "react-native-web";
import { Ionicons } from "@expo/vector-icons";
import styles from "./SelectionStyles";

const AddToShortList = ({
  recipeId,
  familyId,
  selectionListId,
  idArray,
  setIdArray,
  userId,
  mealPlanId,
  shortListId,
}) => {
  const [inIdArray, setInIdArray] = useState(false);

  useEffect(() => {
    setInIdArray(idArray.includes(recipeId));
  }, []);

  return (
    <View>
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => {
          if (inIdArray) {
            deleteFromShortList(
              userId,
              familyId,
              selectionListId,
              mealPlanId,
              shortListId,
              recipeId
            );
            setInIdArray(false);
            setIdArray((currentIdArray) => {
              const newArray = [...currentIdArray];
              const index = newArray.indexOf(recipeId);
              return newArray.splice(index, 1);
            });
          } else {
            setIdArray((currentIdArray) => {
              return [...currentIdArray, recipeId];
            });
            setInIdArray(true);
            addToShortList(
              userId,
              familyId,
              selectionListId,
              mealPlanId,
              shortListId,
              recipeId
            );
          }
        }}
      >
        <Ionicons
          name={inIdArray ? "remove-circle" : "add-circle-outline"}
          size={30}
          color={inIdArray ? "#DD1F13" : "#DD1F13"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AddToShortList;
