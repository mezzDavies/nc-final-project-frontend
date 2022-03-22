import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-web";
import Footer from "./Footer";
import Header from "./Header";

const Homepage = ({ navigation }) => {
  return (
    <View>
      <Header navigation={navigation} />
      <Button
        title="Link to recipe"
        onPress={() => navigation.navigate("RecipePage")}
      />
      {/* ^^^^ This button will be the image of the recipe it links to  */}
      <Footer navigation={navigation} />
    </View>
  );
};

export default Homepage;
