import React from "react";
import { View, Text } from "react-native";

const ShoppingList = ({ navigation }) => {
  return (
    <View>
      <Header navigation={navigation} />
      <Text>This is the ShoppingList !!!!</Text>
      <Footer navigation={navigation} />
    </View>
  );
};

export default ShoppingList;
