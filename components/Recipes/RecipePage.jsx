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

  const recipeId = route.params.id

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
            console.log(res);
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

  const styles = StyleSheet.create({
    image: {
      width: 300,
      height: 200,
      alignContent: "center",
      marginLeft: 25,
      marginRight: 25,
      borderRadius: 10,
    },
    instructTitle: {
      alignContent: "center",
      fontSize: 20,
      paddingTop: 10,
      fontFamily: "Bangers_400Regular",
    },
    instructions: {
      alignContent: "center",
      padding: 20,
      borderStyle: "solid",
      borderColor: "black",
      borderWidth: 2,
      borderRadius: 5,
      marginLeft: 8,
      marginRight: 8,
      marginBottom: 8,
    },
    mealTitle: {
      alignContent: "center",
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 10,
      fontFamily: "Bangers_400Regular",
      fontSize: 25,
    },
    ingredientsTitle: {
      fontSize: 20,
      fontFamily: "Bangers_400Regular",
    },
    ingredients: {
      alignContent: "center",
      paddingLeft: 20,
      paddingRight: 20,
      borderStyle: "solid",
      borderColor: "grey",
      borderWidth: 2,
      borderRadius: 5,
      marginLeft: 8,
      marginRight: 8,
    },
    mins: {
      alignContent: "center",
    },
  });

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
          style={styles.image}
        />
        <View>
          <View>
            <Text style={styles.mealTitle}>{recipeTitle}</Text>
            <Text style={styles.mins}>{`${cookTime} mins`}</Text>
          </View>

          <View>
            <Text
              style={styles.ingredientsTitle}
            >{`Ingredients - serves ${servings}`}</Text>
            {ingredients.map((ingredient, index) => {
              return (
                <Text key={`${ingredient.id}`} style={styles.ingredients}>
                  {ingredient.original}
                </Text>
              );
            })}
          </View>

          <View>
            <Text style={styles.instructTitle}>Instructions</Text>
            <Text style={styles.instructions}>{instructions}</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <CustomButton text="test button" />
          <Button title="Add to shortlist" onPress={addToSelectionPress} />
        </View>
      </View>
    </ScrollView>
  );
};

export default RecipePage;
