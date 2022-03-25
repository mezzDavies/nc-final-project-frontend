import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Homepage from "../HomePage";
import HouseHoldScreen from "../Household-components/Household";
import JoinGroupScreen from "../Household-components/JoinGroupScreen";
import CreateGroupScreen from "../Household-components/CreateGroupScreen";
import AddChildrenScreen from "../Household-components/AddChildrenScreen";
import RecipePage from "../Recipes/RecipePage";
import ProfileScreen from "../Profile";
import SelectionListScreen from "../SelectionList/SelectionListScreen";
import ShoppingListScreen from "../ShoppingList";
import MealPlanScreen from "../MealPlan";
import SignUpPage from "../auth-components/SignUpPage";
import SignInPage from "../auth-components/SignInPage";
import TestingPage from "./Testing";
import RecipesAll from "../Recipes/RecipesAll";

const Stack = createStackNavigator();

const HomepageNavigation = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomePage" component={Homepage} />
        <Stack.Screen name="RecipePage" component={RecipePage} />
        <Stack.Screen name="Testing" component={TestingPage} />
        <Stack.Screen name="RecipesAll" component={RecipesAll} />
      </Stack.Navigator>
    </>
  );
};

const AccountNavigation = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Household" component={HouseHoldScreen} />
        <Stack.Screen name="JoinGroup" component={JoinGroupScreen} />
        <Stack.Screen name="CreateGroup" component={CreateGroupScreen} />
        <Stack.Screen name="AddChildren" component={AddChildrenScreen} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
        <Stack.Screen name="SignIn" component={SignInPage} />
      </Stack.Navigator>
    </>
  );
};

const SelectionListNavigation = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SelectionList" component={SelectionListScreen} />
      </Stack.Navigator>
    </>
  );
};

const ShoppingListNavigation = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ShoppingList" component={ShoppingListScreen} />
      </Stack.Navigator>
    </>
  );
};

const MealPlanNavigation = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MealPlan" component={MealPlanScreen} />
      </Stack.Navigator>
    </>
  );
};

const SignUpNavigation = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </>
  );
};

export {
  HomepageNavigation,
  AccountNavigation,
  SelectionListNavigation,
  ShoppingListNavigation,
  MealPlanNavigation,
  SignUpNavigation,
};
