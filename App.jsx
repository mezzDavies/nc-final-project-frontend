import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { RecipePage } from "./components/RecipePage";

// import app from "./firebase";
// import { fireDB } from "./firebase";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default function App() {
  return (
    <View style={styles.container}>
      <RecipePage />
      <StatusBar style="auto" />
    </View>
  );
}
