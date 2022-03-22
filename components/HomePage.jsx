import React from "react";
import { View, Button } from "react-native";
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
      <Footer navigation={navigation} />
    </View>
  );
};

export default Homepage;
