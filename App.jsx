import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SignInPage from "./components/auth-components/SignInPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackRouter } from "react-navigation";
import Homepage from "./components/HomePage";
import RecipePage from "./components/RecipePage";
import SelectionList from "./components/SelectionList";
import Footer from "./components/Footer";
import ShoppingList from "./components/ShoppingList";
import Household from "./components/Household";
import Header from "./components/Header";

import { getRecipes, getRecipeById } from "./api/firestoreFunctions";

const Stack = createNativeStackNavigator();

export default function App() {
  console.log("firebase function: getRecipes >>", getRecipes());
  console.log("function: getRecipeById >>", getRecipeById("652134"));

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="Footer" component={Footer} />
        <Stack.Screen name="Recipe Page" component={RecipePage} />
        <Stack.Screen name="Selection List" component={SelectionList} />
        <Stack.Screen name="Shopping List" component={ShoppingList} />
        <Stack.Screen name="Household" component={Household} />
        <Stack.Screen name="Header" component={Header} />
        <Stack.Screen name="Sign In Page" component={SignInPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
