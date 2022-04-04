import Header from "./components/Header";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./components/Navigation/TabNavigation";

export default function App() {
  return (
    <>
      <Header />
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </>
  );
}
