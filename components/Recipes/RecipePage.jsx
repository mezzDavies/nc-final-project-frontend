//IMPORTS - react
import { React, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

//IMPORTS - firebase
import { getRecipeById } from "../../api/firestoreFunctions.recipes";
import { addToSelectionList } from "../../api/firestoreFunctions.selectionLists";
import { getFamilies } from "../../api/firestoreFunctions.families";
import getUserDataAndClaims from "../../utils/getUserDataAndClaims";
import { getSelectionLists } from "../../api/firestoreFunctions.selectionLists";

//IMPORTS - components & utils
import Styles from "../Reusables/StylesComponent";
import CustomButton from "../Reusables/CustomButton";
import { auth } from "../../firebase";

//----------COMPONENT----------
const RecipePage = ({ route, navigation }) => {
  //-----Declarations-----
  const [userStatus, setUserStatus] = useState(false);
  const [parentStatus, setParentStatus] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [recipeTitle, setRecipeTitle] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [instructions, setInstructions] = useState("");
  const [servings, setServings] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [familyId, setFamilyId] = useState([]);
  const [selectionListId, setSelectionListId] = useState([]);

  const stylesVar = Styles();
  const recipeId = route.params.id;

  useEffect(() => {
    setIsLoading(true);
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setUserStatus(true)
        getUserDataAndClaims()
        .then(({ claims, userData, newUserId }) => {
          if(!claims.parent) {
            setParentStatus(false)
          } else {
            setParentStatus(true)
          }
          const currentIds = {
            user: newUserId,
            family: userData.groupIds[0]
          }
          setFamilyId(currentIds.family)
          return currentIds
        })
        .then((currentIds) => {
          return getSelectionLists(currentIds.family)
        })
        .then((selectionId) => {
          setSelectionListId(selectionId[0]);
        })
        .catch((err) => {
          return err
        });
      } else {
        setUserStatus(false);
        setIsLoading(false);
      }
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
          {userStatus && parentStatus ? <Button title="Add to Selection List" onPress={addToSelectionPress} /> : null }
        </View>
      </View>
    </ScrollView>
  );
};

export default RecipePage;
