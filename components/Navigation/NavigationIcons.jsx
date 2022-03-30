import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const navigationIcons = ({ route }) => ({
  tabBarIcon: () => {
    if (route.name === "Homepage") {
      return <FontAwesome5 name="home" size={24} color="#FEF4EC" />;
    }
    if (route.name === "Vote") {
      return <Feather name="thumbs-up" size={24} color="#FEF4EC" />;
    }
    if (route.name === "Meal Plan") {
      return <Ionicons name="restaurant-outline" size={24} color="#FEF4EC" />;
    }
    if (route.name === "Shopping List") {
      return <Feather name="shopping-cart" size={24} color="#FEF4EC" />;
    }
    if (route.name === "Account") {
      return (
        <Ionicons name="people-circle-outline" size={24} color="#FEF4EC" />
      );
    }
  },
  tabBarStyle: {
    backgroundColor: `#DD1F13`,
    borderTopWidth: 1,
    height: 70,
    justifyContent: "center",
  },
  headerTintColor: "#FFFFFF",
  tabBarActiveTintColor: "#FFFFFF",
  tabBarInactiveTintColor: "#FFF",
  headerShown: false,
});

export default navigationIcons;
