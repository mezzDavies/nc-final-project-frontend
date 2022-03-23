import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-web";

const Homepage = ({ navigation }) => {
  return (
    <View>
      <Text style={{ textAlign: "center", marginTop: 300 }}>Home Screen</Text>
      <Button
        title="Go to recipe..."
        onPress={() => navigation.navigate("RecipePage")}
      />
    </View>
  );
};

export default Homepage;
