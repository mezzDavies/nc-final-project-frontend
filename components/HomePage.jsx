import { View, Text, Button, ScrollView } from "react-native";
import React from "react";
import RandomRecipes from "./RandomRecipes";

export default function Homepage({ navigation }) {
  return (
    <ScrollView>
      <View>
        <RandomRecipes navigation={navigation} />
        <Text style={{ textAlign: "center", marginTop: 20 }}>Home Screen</Text>
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
          title="Go to Testing..."
          onPress={() => navigation.navigate("Testing")}
        />
      </View>
    </ScrollView>
  );
}
