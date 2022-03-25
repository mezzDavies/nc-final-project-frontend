import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomepageNavigation, MealPlanNavigation } from "./StackNavigation";
import { AccountNavigation } from "./StackNavigation";
import { SelectionListNavigation } from "./StackNavigation";
import { ShoppingListNavigation } from "./StackNavigation";
import navigationIcons from "./NavigationIcons";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <>
      <Tab.Navigator screenOptions={navigationIcons}>
        <Tab.Screen name="Recipes" component={HomepageNavigation} />
        <Tab.Screen name="Vote" component={SelectionListNavigation} />
        <Tab.Screen name="Meal Plan" component={MealPlanNavigation} />
        <Tab.Screen name="Shopping List" component={ShoppingListNavigation} />
        <Tab.Screen name="Account" component={AccountNavigation} />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabNavigator;
