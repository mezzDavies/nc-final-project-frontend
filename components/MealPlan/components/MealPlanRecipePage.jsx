import { React, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { getRecipeById } from "../../../api/firestoreFunctions.recipes";
import { addToSelectionList } from "../../../api/firestoreFunctions.selectionLists";

const familyId = "yPRj8Q1cEgwJ465bec04";
const selectionListId = "oeAuz0njIbYyPeLUqpUw";

const MealPlanRecipePage = ({ route }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [recipeTitle, setRecipeTitle] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [instructions, setInstructions] = useState("");
  const [servings, setServings] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const recipeId = route.params.id;
  console.log(recipeId);

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
