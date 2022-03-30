import { React, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import { getRecipeById } from "../../api/firestoreFunctions.recipes";
import { addToSelectionList } from "../../api/firestoreFunctions.selectionLists";
import { getFamilies } from "../../api/firestoreFunctions.families";
import getUserDataAndClaims from "../../utils/getUserDataAndClaims";
import { getSelectionLists } from "../../api/firestoreFunctions.selectionLists";
import styles from "./components/RecipePageStyles";
import CustomButton from "../Reusables/CustomButton";

const RecipePage = ({ route, navigation }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [recipeTitle, setRecipeTitle] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [instructions, setInstructions] = useState("");
  const [servings, setServings] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [familyId, setFamilyId] = useState([]);
  const [userId, setUserId] = useState([]);
  const [selectionListId, setSelectionListId] = useState([]);
  const recipeId = route.params.id;

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
            return familyId;
          })
          .then((res) => {
            getSelectionLists(res).then((selectionId) => {
              setSelectionListId(selectionId[0]);
            });
          });
      });
  }, []);

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

  if (isLoading) return <Text>Loading...</Text>;

  const addToSelectionPress = () => {
    addToSelectionList(familyId, selectionListId, recipeId).catch(() => {
      alert(
        "Error: recipe not added. Please check your connection and click again to add recipe."
      );
    });
    navigation.navigate("HomePage");
  };

  return (
    <ScrollView>
      <View>
        <View>
          <ImageBackground
            source={{
              width: 556,
              height: 250,
              uri: `${imageUrl}`,
            }}
            style={styles.image}
          >
            <View style={styles.recipeHeader}>
              <Text style={styles.mealTitle}>{recipeTitle}</Text>
              <Text style={styles.dividingLine} />
              <Text style={styles.mins}>{`Ready in ${cookTime} minutes`}</Text>
              <Text style={styles.mins}>{`Serves ${servings}`}</Text>
            </View>
          </ImageBackground>
          <View style={styles.ingredients}>
            <Text style={styles.ingredientsTitle}>{`Ingredients`}</Text>
            {ingredients.map((ingredient, index) => {
              return (
                <Text key={`${ingredient.id}`}>{ingredient.original}</Text>
              );
            })}
          </View>

          <View style={styles.ingredients}>
            <Text style={styles.ingredientsTitle}>Instructions</Text>
            <Text>{instructions}</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <Button
            title="Add to Selection List"
            onPress={addToSelectionPress}
            color="#DD1F13"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default RecipePage;
