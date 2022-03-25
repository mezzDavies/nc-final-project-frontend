import react from "react";
import { Button } from "react-native";
import { useState } from "react";
import { addToShortList } from "../../../api/firestoreFunctions.shortLists";

const AddToShortList = ({ recipeId, familyId, selectionListId }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const userId = "ItsERU60MCYeXcSCtXJeaBR1JQa2";
  const mealPlanId = "V00CM4zYfykUNjxUXI80";
  const shortListId = "5w7i9bZCss4JXtgfQWg6";

  return (
    <Button
      title="Vote"
      disabled={isDisabled}
      onPress={() => {
        setIsDisabled(true);
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
