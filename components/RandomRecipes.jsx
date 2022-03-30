import { React, useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
} from "react-native";
import { getRecipes } from "../api/firestoreFunctions.recipes";

export default function RandomRecipes({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    getRecipes().then(({ recipeCards }) => {
      if (mounted) {
        const shuffled = [...recipeCards].sort(() => 0.5 - Math.random());
        setRecipes(shuffled.slice(0, 1));
        setIsLoading(false);
      }
    });
    return () => (mounted = false);
  }, []);

  const styles = StyleSheet.create({
    background: {
      backgroundColor: "white",
      marginTop: 16,
      marginRight: 10,
      marginLeft: 10,
      padding: 15,
      borderRadius: 10,
      marginBottom: 6,
      alignItems: "center",
      borderColor: "#DD1F13",
      borderWidth: 5,
    },
    image: {
      width: 300,
      height: 200,
      alignContent: "center",
      marginLeft: 25,
      marginRight: 25,
      borderRadius: 10,
    },
    title: {
      fontSize: 15,
      margin: 5,
      marginLeft: 25,
      marginTop: 15,
      marginBottom: 15,
      color: "#DD1F13",
      textAlign: "center",
      fontSize: 30,
      fontFamily: "Bangers_400Regular",
    },
    minutes: {
      textAlign: "center",
      marginBottom: 10,
      color: "#DD1F13",
    },
    minutes: {
      marginTop: 5,
      textAlign: "center",
      marginBottom: 10,
      color: "#DD1F13",
    },
    foodTitle: {
      textAlign: "center",
      color: "#DD1F13",
      fontSize: 22,
      fontFamily: "Bangers_400Regular",
      marginTop: 10,
    },
    loadingText: {
      marginTop: 200,
      textAlign: "center",
      color: "#DD1F13",
      fontSize: 35,
      fontFamily: "Bangers_400Regular",
    },
    tagLine: {
      color: "#DD1F13",
      fontWeight: "800",
      fontSize: 17,
      marginLeft: 25,
      marginBottom: 10,
    },
  });

  if (isLoading) return <Text style={styles.loadingText}>Loading...</Text>;

  return (
    <View style={styles.background}>
      <Text style={styles.title}>Todays favourite...</Text>
      {recipes
        ? recipes.map((recipe) => {
            const { image, readyInMinutes, title, id, servings } = recipe;
            return (
              <View key={`container-` + id}>
                <TouchableHighlight
                  onPress={() => {
                    navigation.navigate("RecipePage", { id });
                  }}
                >
                  <Image
                    key={"image-" + id}
                    source={{ uri: image }}
                    style={styles.image}
                  />
                </TouchableHighlight>
                <Text key={"title-" + id} style={styles.foodTitle}>
                  {title}
                </Text>
                <Text
                  key={"minutes-" + id}
                  style={styles.minutes}
                >{`Ready in ${readyInMinutes} minutes | Serves ${servings}`}</Text>
              </View>
            );
          })
        : null}
    </View>
  );
}
