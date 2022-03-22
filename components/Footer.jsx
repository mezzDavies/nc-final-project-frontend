import React from "react";
import { View } from "react-native";
import { Button } from "react-native-web";

const Footer = ({ navigation }) => {
  return (
    <View>
      <Button></Button>
      <Button
        title="SelectionList"
        onPress={() => navigation.navigate("SelectionList")}
      />
      <Button
        title="HouseHold"
        onPress={() => navigation.navigate("Household")}
      />
      <Button
        title="ShoppingList"
        onPress={() => navigation.navigate("ShoppingList")}
      />
      <Button
        title="SignInPage"
        onPress={() => navigation.navigate("SignInPage")}
      />
    </View>
  );
};

export default Footer;
