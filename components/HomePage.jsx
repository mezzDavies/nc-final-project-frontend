import React from "react";
import { Button, View, Text } from "react-native";

const Homepage = ({ navigation }) => {
  return (
    <>
      <View>
        <Text style={{ textAlign: "center", marginTop: 300 }}>Home Screen</Text>
        <Button
          title="Go to recipe..."
          onPress={() => navigation.navigate("RecipePage")}
        />
        <Button
          title="Go to sign up..."
          onPress={() => navigation.navigate("SignUp")}
        />
        <Button
          title="Go to sign in..."
          onPress={() => navigation.navigate("SignIn")}
        />
        <Button
          title="Go to search page in..."
          onPress={() => navigation.navigate("SearchPage")}
        />
      </View>
    </>
  );
};

export default Homepage;
