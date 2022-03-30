import react from "react";
import { Button } from "react-native";
import { useState, useEffect } from "react";
import {
  addToShortList,
  getShortList,
  getShortListFromCollection,
} from "../../../api/firestoreFunctions.shortLists";
import { getMealPlans } from "../../../api/firestoreFunctions.mealPlans";
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
  console.log(shortListId);

  return (
    <Button
      style={styles.voteBtn}
      title="Vote"
      disabled={idArray.includes(recipeId) ? true : false}
      onPress={() => {
        setIdArray((currentIdArray) => {
          return [...currentIdArray, recipeId];
        });
        addToShortList(
          userId,
          familyId,
          selectionListId,
          mealPlanId,
          shortListId,
          recipeId
        );
      }}
    />
  );
};

export default AddToShortList;
