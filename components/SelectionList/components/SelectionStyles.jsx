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
    marginBottom: 5,
    marginTop: 5,
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
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  intro: { fontSize: 20, textAlign: "center" },
  introContainer: { marginTop: 15, padding: 10, marginBottom: 20 },
  recipes: {
    marginTop: 12,
    backgroundColor: "white",
    marginRight: 10,
    marginLeft: 10,
    padding: 15,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: "center",
  },
  dividingLine: {
    borderStyle: "solid",
    borderBottomColor: "#DD1F13",
    borderBottomWidth: 0.25,
    width: 350,
    marginTop: 17,
    textAlign: "center",
  },
  spacing: { marginBottom: 15 },
});

export default styles;
