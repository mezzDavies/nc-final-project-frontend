import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image: {
    width: 600,
    flexDirection: "row",
  },
  instructTitle: {
    alignContent: "center",
    fontSize: 20,
    paddingTop: 10,
    fontFamily: "Bangers_400Regular",
  },
  recipeHeader: {
    padding: "24px",
    flex: 1,
    marginTop: 200,
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
    paddingRight: 20,
    paddingTop: 10,
    fontSize: 20,
    color: "white",
    flexShrink: 1,
    fontWeight: 600,
  },
  ingredientsTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 600,
  },
  ingredients: {
    alignContent: "center",
    padding: 15,
    borderStyle: "solid",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
  },
  mins: {
    color: "white",
    fontWeight: 400,
  },
  dividingLine: {
    borderStyle: "solid",
    borderBottomColor: "white",
    borderBottomWidth: 2,
    width: 200,
    marginTop: 5,
    marginBottom: 7,
    alignItems: "center",
  },
  buttons: { marginBottom: 15 },
});

export default styles;
