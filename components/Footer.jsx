import React from "react";
import { View, Button } from "react-native";

const Footer = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Selection List"
        onPress={() => navigation.navigate("SelectionList")}
      />
      <Button
        title="Household"
        onPress={() => navigation.navigate("Household")}
      />
      <Button
        title="Shopping List"
        onPress={() => navigation.navigate("ShoppingList")}
      />
      <Button
        title="Sign In Page"
        onPress={() => navigation.navigate("SignInPage")}
      />
    </View>
  );
};

export default Footer;
