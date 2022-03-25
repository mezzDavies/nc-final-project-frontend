import react from "react";
import { Button } from "react-native";
import { useState, useEffect } from "react";
import {
  addToShortList,
  getShortList,
} from "../../../api/firestoreFunctions.shortLists";

const AddToShortList = ({
  recipeId,
  familyId,
  selectionListId,
  idArray,
  setIdArray,
}) => {
  const userId = "ItsERU60MCYeXcSCtXJeaBR1JQa2";
  const mealPlanId = "V00CM4zYfykUNjxUXI80";
  const shortListId = "5w7i9bZCss4JXtgfQWg6";
  const getShortListId = "pyo37SSXc3rlDrODekIY";

  return (
    <Button
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
