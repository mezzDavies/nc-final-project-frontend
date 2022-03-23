import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Homepage from "../HomePage";
import HouseHoldScreen from "../Household";
import RecipePage from "../RecipePage";
import ProfileScreen from "../Profile";
import SelectionListScreen from "../SelectionList";
import ShoppingListScreen from "../ShoppingList";
import MealPlanScreen from "../MealPlan";
import SignUpPage from "../auth-components/SignUpPage";
import SignInPage from "../auth-components/SignInPage";

const Stack = createStackNavigator();

const HomepageNavigation = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomePage" component={Homepage} />
        <Stack.Screen name="RecipePage" component={RecipePage} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
        <Stack.Screen name="SignIn" component={SignInPage} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </>
  );
};

const HouseholdNavigation = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Household" component={HouseHoldScreen} />
      </Stack.Navigator>
    </>
  );
};

// const ProfileNavigation = () => {
//   return (
//     <>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Profile" component={ProfileScreen} />
//       </Stack.Navigator>
//     </>
//   );
// };

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
  HouseholdNavigation,
  // ProfileNavigation,
  SelectionListNavigation,
  ShoppingListNavigation,
  MealPlanNavigation,
  SignUpNavigation,
};
