import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableHighlight } from "react-native";
import AddToShortList from "./AddToShortlist";
import { Ionicons } from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../../../firebase";
import styles from "./SelectionStyles";

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
  shortListId,
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

  if (isLoading) return <Text style={styles.loadingText}>Loading...</Text>;

  const { id, image, readyInMinutes, servings, title } = recipe;

  return (
    <View>
      <View style={styles.recipe}>
        <TouchableHighlight
          onPress={() => {
            navigation.navigate("RecipePage", { id });
          }}
        >
          <Image source={{ uri: image }} style={styles.image} />
        </TouchableHighlight>
        <Text
          style={(styles.recipeInfo, styles.recipeTitle)}
        >{`${title}`}</Text>
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
      </View>
      <View>
        <Text style={styles.dividingLine} />
      </View>
    </View>
  );
};

export default SelectionListCard;
