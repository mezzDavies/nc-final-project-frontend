import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  recipes: {
    marginTop: 16,
    backgroundColor: "white",
    marginRight: 10,
    marginLeft: 10,
    padding: 15,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
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
  dividingLine: {
    borderStyle: "solid",
    borderBottomColor: "black",
    borderBottomWidth: 0.25,
    width: 200,
    marginTop: 20,
    alignItems: "center",
  },
  tagLine: {
    color: "black",
    fontWeight: "800",
    fontSize: 14,
    marginBottom: 15,
    color: "#DD1F13",
    alignContent: "center",
    marginTop: 10,
  },
});

export default styles;
