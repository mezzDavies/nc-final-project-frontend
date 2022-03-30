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
    marginBottom: 10,
    textAlign: "center",
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
    flex: 1,
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 700,
    color: "#DD1F13",
    textAlign: "center",
  },
  innerlist: {
    alignContent: "center",
    padding: 15,
    borderStyle: "solid",
    borderColor: "#DD1F13",
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
  },
  list: {
    marginTop: 16,
    backgroundColor: "white",
    marginRight: 10,
    marginLeft: 10,
    padding: 15,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: "center",
  },
  weekdayTitle: {
    fontSize: 17,
    color: "#DD1F13",
    fontWeight: "600",
  },
  button: {
    marginTop: 10,
  },
});

export default styles;
