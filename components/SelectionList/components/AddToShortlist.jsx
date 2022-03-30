import react from "react";
import { Button } from "react-native";
import { useState, useEffect } from "react";
import {
  addToShortList,
  deleteFromShortList,
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
  const [inIdArray, setInIdArray] = useState(false);

  useEffect(() => {
    setInIdArray(idArray.includes(recipeId));
  }, []);

  return (
    <Button
      style={styles.voteBtn}
      title={inIdArray ? `Already Voted` : `Vote`}
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
    />
  );
};

export default AddToShortList;
