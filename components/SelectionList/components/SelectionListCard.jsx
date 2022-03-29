import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableHighlight } from "react-native";
import { getRecipeById } from "../../../api/firestoreFunctions.recipes";
import AddToShortList from "./AddToShortlist";
import DeleteRecipeFromList from "./DeleteRecipeFromList";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../../../firebase";

const SelectionListCard = ({
  idArray,
  setIdArray,
  navigation,
  recipeId,
  familyId,
  selectionListId,
  setSelectionList,
  userId,
  mealPlanId,
  shortListId
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState([]);

  async function shortGetRecipeById(recipeId) {
    const recipeIdAsStr = recipeId.toString();
    const docRef = doc(fireDB, "recipes", recipeIdAsStr);

    const result = {};

    const querySnapshots = await Promise.all([getDoc(docRef)]);

    result.summary = querySnapshots[0].data();

    return result;
  }

  useEffect(() => {
    setIsLoading(true);
    shortGetRecipeById(recipeId)
      .then(({ summary }) => {
        setRecipe(summary);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) return <Text>Loading...</Text>;

  const { id, image, readyInMinutes, servings, title } = recipe;

  return (
    <View>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("RecipePage", { id });
        }}
      >
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      </TouchableHighlight>
      <Text>{`${title}`}</Text>
      <AddToShortList
        idArray={idArray}
        setIdArray={setIdArray}
        familyId={familyId}
        recipeId={recipeId}
        navigation={navigation}
        selectionListId={selectionListId}
        userId={userId}
        mealPlanId={mealPlanId}
        shortListId={shortListId}
      />
      <DeleteRecipeFromList
        recipeId={recipeId}
        selectionListId={selectionListId}
        setSelectionList={setSelectionList}
        recipe={recipe}
        familyId={familyId}
      />
    </View>
  );
};

export default SelectionListCard;
