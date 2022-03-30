import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  title: {
    flex: 1,
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 600,
  },
  list: {
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
});

export default styles;
