import React from "react";
import { StyleSheet } from "react-native";

const Styles = () => {
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

  return styles;
};

export default Styles;
