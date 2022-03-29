//IMPORTS - react
import { React, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

//IMPORTS - firebase
import { getMealPlans } from "../../../api/firestoreFunctions.mealPlans";
import { getRecipeById } from "../../../api/firestoreFunctions.recipes";
import { getSelectionList } from "../../../api/firestoreFunctions.selectionLists";
import { getFamilies } from "../../../api/firestoreFunctions.families";

//IMPORTS - components & utils
import getUserDataAndClaims from "../../../utils/getUserDataAndClaims";

//----------COMPONENT----------
const MealPlanRecipePage = ({ route }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [recipeTitle, setRecipeTitle] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [instructions, setInstructions] = useState("");
  const [servings, setServings] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectionListId, setSelectionListId] = useState("");
  const [familyId, setFamilyId] = useState("");
  const [selectionList, setSelectionList] = useState("");
  const [userId, setUserId] = useState("");

  const recipeId = route.params.id;

  const styles = StyleSheet.create({
    body: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "white",
    },
  });

  useEffect(() => {
    setIsLoading(true);
    getRecipeById(recipeId)
      .then(({ ingredients, summary: recipe }) => {
        const { image, title, readyInMinutes, instructions, servings } = recipe;
        setImageUrl(image);
        setIngredients(ingredients);
        setRecipeTitle(title);
        setCookTime(readyInMinutes);
        setInstructions(instructions);
        setServings(servings);
        setIsLoading(false);
      })
      .catch((err) => console.log("error in catch >>>", err));
  }, []);

  useEffect(() => {
    getUserDataAndClaims()
      .then(({ claims, userData, newUserId }) => {
        setUserId(newUserId);
        return newUserId;
      })
      .then((userId) => {
        return getFamilies(userId)
          .then((familyId) => {
            setFamilyId(familyId[0]);
            return familyId[0];
          })
          .then((res) => {
            getSelectionLists(res)
              .then((selectionId) => {
                setSelectionListId(selectionId[0]);
                const newFamilyId = res;
                const newSelectionListId = selectionId[0];
                return Promise.all([newFamilyId, newSelectionListId]);
              })
              .then(([newFamilyId, newSelectionListId]) => {
                console.log(newFamilyId, newSelectionListId);
                return Promise.all([
                  getSelectionList(newFamilyId, newSelectionListId),
                  newFamilyId,
                  newSelectionListId,
                ]);
              })
              .then(([selectList, newFamilyId, newSelectionListId]) => {
                console.log(newFamilyId, newSelectionListId);
                setSelectionList(finalSelectionList[0]);
                getMealPlans(newFamilyId, newSelectionListId);
                return Promise.all([newFamilyId, newSelectionListId]);
              })
              .then(([newFamilyId, newSelectionListId]) => {
                console.log(newFamilyId, newSelectionListId);
              });
          });
      });
  }, []);

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <ScrollView>
      <View style={styles.body}>
        <Image
          source={{
            width: 556,
            height: 370,
            uri: `${imageUrl}`,
          }}
          style={{ resizeMode: "cover" }}
        />

        <View>
          <View>
            <Text style={styles.image_text}>{recipeTitle}</Text>
            <Text style={styles.image_text}>{`${cookTime} mins`}</Text>
          </View>
          <View>
            <Text>{`Ingredients - serves ${servings}`}</Text>
            {ingredients.map((ingredient, index) => {
              return (
                <Text key={`${ingredient.id}`}>{ingredient.original}</Text>
              );
            })}
          </View>
          <View>
            <Text>Instructions</Text>
            <Text>{instructions}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MealPlanRecipePage;
