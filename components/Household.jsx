import React from "react";
import { View, Text } from "react-native";
import Header from "./Header";
import Footer from "./Footer";

const Household = ({ navigation }) => {
  return (
    <View>
      <Header navigation={navigation} />
      <Text>This is the Household !!!!</Text>
      <Footer navigation={navigation} />
    </View>
  );
};

export default Household;
