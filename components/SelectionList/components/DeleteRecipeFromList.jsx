import { Button } from "react-native";
import React, { useState } from "react";
import { deleteFromSelectionList } from "../../../api/firestoreFunctions.selectionLists";
import styles from "./SelectionStyles";

const DeleteRecipeFromList = ({
  familyId,
  selectionListId,
  recipeId,
  setSelectionList,
  recipe,
}) => {
  const deletedRecipe = useState({ recipe });

  const removeRecipePress = () => {
    deleteFromSelectionList(familyId, selectionListId, recipeId)
      .then(() => {
        setSelectionList((currentSelectionList) => {
          return [...currentSelectionList].filter((id) => id !== recipeId);
        });
      })
      .catch(() => {
        setSelectionList((currentSelectionList) => {
          return [deletedRecipe, ...currentSelectionList];
        });
        alert(
          "Error: recipe not deleted. Please check your connection and click to delete recipe again."
        );
      });
  };

  return (
    <Button
      style={styles.deleteBtn}
      title="Delete From Selection List"
      onPress={() => {
        removeRecipePress();
      }}
    />
  );
};

export default DeleteRecipeFromList;
