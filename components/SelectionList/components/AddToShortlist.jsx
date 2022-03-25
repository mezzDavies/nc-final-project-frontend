import react from "react";
import { Button } from "react-native";
import { addToShortList } from "../../../api/firestoreFunctions.shortLists";

const AddToShortList = ({ recipeId, familyId, selectionListId }) => {
  console.log(recipeId);
  const userId = "ItsERU60MCYeXcSCtXJeaBR1JQa2";
  const mealPlanId = "V00CM4zYfykUNjxUXI80";
  const shortListId = "5w7i9bZCss4JXtgfQWg6";
  return (
    <Button
      title="Add to Shortlist"
      onPress={() => {
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
