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
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 5,
  },
  recipe: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "center",
  },
  dividingLine: {
    borderStyle: "solid",
    borderBottomColor: "#DD1F13",
    borderBottomWidth: 0.25,
    width: 300,
    marginTop: 17,
    alignItems: "center",
  },
  tagLine: {
    color: "black",
    fontWeight: "800",
    fontSize: 15,
    marginBottom: 15,
    color: "#DD1F13",
    marginTop: 10,
    textAlign: "center",
  },
  icons: { marginRight: 3 },
  peopleIcon: { marginLeft: 3, marginRight: 3 },
});

export default styles;
