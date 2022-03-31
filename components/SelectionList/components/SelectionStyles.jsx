import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  recipes: {
    marginTop: 16,
    backgroundColor: "fff",
  },
  image: {
    flex: 1,
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeTitle: {
    fontWeight: "600",
    marginRight: 10,
  },
  recipe: {
    flexDirection: "row",
    alignItems: "center",
    margin: 15,
    width: 400,
  },
  intro: { fontSize: 20, textAlign: "center" },
  introContainer: { marginTop: 15, padding: 10, marginBottom: 20 },
  recipes: {
    backgroundColor: "white",
    marginRight: 10,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  dividingLine: {
    borderStyle: "solid",
    borderBottomColor: "#DD1F13",
    borderBottomWidth: 0.25,
    width: 400,
    textAlign: "center",
    margin: 10,
  },
  spacing: { marginBottom: 10 },
});

export default styles;
