import { React, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

import { getRecipeById } from "../../api/firestoreFunctions.recipes";
import { addToSelectionList } from "../../api/firestoreFunctions.selectionLists";
import { getFamilies } from "../../api/firestoreFunctions.families";
import getUserDataAndClaims from "../../utils/getUserDataAndClaims";
import { getSelectionLists } from "../../api/firestoreFunctions.selectionLists";
import Styles from "../MealPlan/components/StylesComponent";
import CustomButton from "../reusables/CustomButton";

const RecipePage = ({ route }) => {
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

  const stylesVar = Styles();
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
  };

  return (
    <ScrollView>
      <View>
        <Image
          source={{
            width: 556,
            height: 370,
            uri: `${imageUrl}`,
          }}
          style={stylesVar.image}
        />
        <View>
          <View>
            <Text style={stylesVar.mealTitle}>{recipeTitle}</Text>
            <Text style={stylesVar.mins}>{`${cookTime} mins`}</Text>
          </View>

          <View>
            <Text
              style={stylesVar.ingredientsTitle}
            >{`Ingredients - serves ${servings}`}</Text>
            {ingredients.map((ingredient, index) => {
              return (
                <Text key={`${ingredient.id}`} style={stylesVar.ingredients}>
                  {ingredient.original}
                </Text>
              );
            })}
          </View>

          <View>
            <Text style={stylesVar.instructTitle}>Instructions</Text>
            <Text style={stylesVar.instructions}>{instructions}</Text>
          </View>
        </View>
        <View style={stylesVar.buttons}>
          <CustomButton text="test button" />
          <Button title="Add to shortlist" onPress={addToSelectionPress} />
        </View>
      </View>
    </ScrollView>
  );
};

export default RecipePage;
