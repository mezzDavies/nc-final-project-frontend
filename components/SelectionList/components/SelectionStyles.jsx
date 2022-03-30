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
  },
  recipeInfo: {
    flex: 1,
  },
  recipeTitle: {
    fontWeight: "600",
  },
  recipe: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  voteBtn: { flex: 1 },
  deleteBtn: { flex: 1 },
});

export default styles;
