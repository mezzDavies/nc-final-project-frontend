import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
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
    color: "black",
    fontFamily: "System",
    fontSize: 14,
  },
  title: {
    flex: 1,
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 700,
    color: "#DD1F13",
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
});

export default styles;
