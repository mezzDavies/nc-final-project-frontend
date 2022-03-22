import React from "react";
import { View, Text } from "react-native";
import Footer from "./Footer";
import Header from "./Header";

const RecipePage = ({ navigation }) => {
  return (
    <View>
      <Header navigation={navigation} />
      <Text>This is the RecipePage !!!!</Text>
      <Footer navigation={navigation} />
    </View>
  );
};

export default RecipePage;
