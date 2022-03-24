import { React, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { getRecipeById } from "../api/firestoreFunctions";

const RecipePage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [recipeTitle, setRecipeTitle] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [instructions, setInstructions] = useState("");
  const [servings, setServings] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
    getRecipeById("511728")
      .then((res) => {
        // console.log("res >>>", res);
        setImageUrl(res.summary.image);
        setIngredients(res.ingredients);
        setRecipeTitle(res.summary.title);
        setCookTime(res.summary.readyInMinutes);
        setInstructions(res.summary.instructions);
        setServings(res.summary.servings);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error in catch >>>", err);
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
        <View style={styles.buttons}>
          <Button title="Add to shortlist" onPress={{}} />
          <Button title="Add to favourites" onPress={{}} />
        </View>
      </View>
    </ScrollView>
  );
};

export default RecipePage;
