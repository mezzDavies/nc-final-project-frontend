import React from "react";
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
  },
  tagLine: {
    color: "black",
    fontWeight: "800",
    fontSize: 17,
  },
});

const Header = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Bangers_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={styles.body}>
      <Text
        style={styles.baseText}
        onPress={() => navigation.navigate("Homepage")}
      >{`Planet Scran It `}</Text>
      <Text style={styles.tagLine}>{`\nA whole new world of food!`}</Text>
    </SafeAreaView>
  );
};

export default Header;
