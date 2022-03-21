import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts, Bangers_400Regular } from "@expo-google-fonts/dev";

const styles = StyleSheet.create({
  body: {
    color: "#DD1F13",
    backgroundColor: "white",
    height: "22%",
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "center",
  },
  baseText: {
    color: "#DD1F13",
    fontSize: 60,
    fontFamily: "Bangers_400Regular",
    lineHeight: 0,
  },
  tagLine: {
    color: "black",
    fontWeight: "800",
    fontSize: 17,
    lineHeight: 15,
  },
});

const Header = () => {
  let [fontsLoaded] = useFonts({
    Bangers_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={styles.body}>
      <Text style={styles.baseText}>{`Planet Scran It `}</Text>
      <Text style={styles.tagLine}>{`\nA whole new world of food!`}</Text>
    </SafeAreaView>
  );
};

export default Header;
