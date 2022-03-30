import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  recipes: {
    marginTop: 16,
    backgroundColor: "fff",
  },
  image: {
    width: 200,
    height: 200,
    alignContent: "center",
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 5,
  },
  recipeInfo: {
    flex: 1,
    textAlign: "center",
  },
  recipeTitle: {
    fontWeight: "bold",
  },
  recipe: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "center",
  },
});

export default styles;
