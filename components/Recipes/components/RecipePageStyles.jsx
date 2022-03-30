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
    padding: 24,
    flex: 1,
    marginTop: 200,
    marginBottom: 20,
  },
  mealTitle: {
    paddingRight: 20,
    paddingTop: 10,
    fontSize: 20,
    color: "#DD1F13",
    flexShrink: 1,
    fontWeight: 600,
  },
  ingredientsTitle: {
    color: "#DD1F13",
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 600,
  },
  ingredients: {
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
  instructions: {
    alignContent: "center",
    padding: 15,
    borderStyle: "solid",
    borderColor: "#DD1F13",
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
  },
  mins: {
    color: "#DD1F13",
    fontWeight: 400,
  },
  dividingLine: {
    borderStyle: "solid",
    borderBottomColor: "#DD1F13",
    borderBottomWidth: 2,
    width: 200,
    marginTop: 5,
    marginBottom: 7,
    alignItems: "center",
  },
  buttons: { marginBottom: 15 },
  infoContainer: {
    marginTop: -16,
    padding: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});

export default styles;
