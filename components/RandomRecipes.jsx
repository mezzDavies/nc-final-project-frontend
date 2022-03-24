import { React, useState, useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { getRecipes } from "../api/firestoreFunctions";

export default function RandomRecipes({ navigation }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes().then(({ recipeCards }) => {
      const shuffled = [...recipeCards].sort(() => 0.5 - Math.random());
      setRecipes(shuffled.slice(0, 3));
    });
  }, []);

  const imageStyles = StyleSheet.create({
    container: {
      width: 300,
      height: 200,
      alignContent: "center",
      marginLeft: 25,
      marginRight: 25,
      borderRadius: 10,
    },
  });

  const titleStyle = StyleSheet.create({
    container: {
      fontSize: 20,
      margin: 5,
    },
  });

  const minutesStyle = StyleSheet.create({
    container: {
      textAlign: "center",
      marginBottom: 10,
    },
  });

  const foodTitleStyle = StyleSheet.create({
    container: {
      textAlign: "center",
    },
  });

  return (
    <View>
      <Text style={titleStyle.container}>Todays favourites...</Text>
      {recipes
        ? recipes.map((recipe) => {
            const { image, readyInMinutes, title, id } = recipe;
            return (
              <View key={`container-` + id}>
                <Image
                  key={"image-" + id}
                  source={{ uri: image }}
                  style={imageStyles.container}
                  onClick={() => {
                    navigation.navigate("RecipePage", { id });
                  }}
                />
                <Text key={"title-" + id} style={foodTitleStyle.container}>
                  {title}
                </Text>
                <Text
                  key={"minutes-" + id}
                  style={minutesStyle.container}
                >{`${readyInMinutes} minutes`}</Text>
              </View>
            );
          })
        : null}
    </View>
  );
}
