import React from "react";
import { View, Text, Button } from "react-native";

import { getRecipes, getRecipeById } from "../api/firestoreFunctions.recipes";

import {
  addFamily,
  updateFamilyName,
  addUserToFamily,
  getFamily,
  listenFamily,
  removeUserFromFamily,
  toggleFamilyStatus,
} from "../api/firestoreFunctions.families";

import {
  updateSelectionListName,
  updateSelectionListSchedule,
  addSelectionList,
  addToSelectionList,
  deleteSelectionList,
  deleteFromSelectionList,
  getSelectionList,
  listenSelectionList,
  toggleSelectionListStatus,
} from "../api/firestoreFunctions.selectionLists";

import {
  addMealPlan,
  calculateShoppingList,
  calculateVotes,
  deleteMealPlan,
  getMealPlan,
  toggleMealPlanStatus,
} from "../api/firestoreFunctions.mealPlans";

import {
  addShortList,
  addToShortList,
  deleteFromShortList,
  deleteShortList,
  getShortList,
  orderShortList,
} from "../api/firestoreFunctions.shortLists";

const users1 = [
  "ItsERU60MCYeXcSCtXJeaBR1JQa2",
  "YVe2KaPpzkO4r7tzbCdmFyYjhvv2",
  "v9bCzL6TvlYNToUaQD752kQlzk53",
];
const users2 = [
  "OHTUs3rqbiRldLT8V40OfBGgO3G3",
  "U0H7apL3z8VpHXSTi0cJjYCWGQf1",
  "UOEgttWxqTYulCJMXJT8ZQUVbNF3",
];

const families = ["yPRj8Q1cEgwJ465bec04", "wsPlMTRTkJouyfRkZE3u"];

const selectionList = ["oeAuz0njIbYyPeLUqpUw", "2FNBNushP1rwKiTIVsGn"];

const shortList1 = [
  "pyo37SSXc3rlDrODekIY",
  "5w7i9bZCss4JXtgfQWg6",
  "ttiABva8DVKXJru68GeE",
];

const shortList2 = [
  "RsdpCk0wp2Jke0EW46jl",
  "XayFCpPtJ4CbjbZXZDmd",
  "yKzECAhfu0eh3JcvrpHh",
];

const mealPlan = ["V00CM4zYfykUNjxUXI80", "Pv2p4A0s3YDsha3dPBkC"];

const recipes = [
  1697787, 511728, 648432, 652134, 654812, 654857, 654959, 664786, 716627,
];

const RecipePage = () => {
  // console.log(addSelectionList("PE3gVlyg7xiqU7kGXuix"));

  // FAMILY
  // addFamily(users1[0], "example family 2");
  // addUserToFamily(users2[1], families[1]);
  // removeUserFromFamily(users2[1], families[1]);
  // console.log(updateFamilyName(families[1], "Family 2"));
  // console.log(getFamily(families[1]));
  // console.log(listenFamily(families[0]));
  // console.log(listenFamily(families[1]));
  // console.log(toggleFamilyStatus(families[1]));
  // SELECTION LIST
  // console.log(
  //   toggleSelectionListStatus("PE3gVlyg7xiqU7kGXuix", "oFmv4Sdt3da6qtvOOP0Z")
  // );
  // addToSelectionList(
  //   "Fxj4fb7gWPdFCKDCa5K9",
  //   "bo2XEWgWaO8Y1VWtxi2j",
  //   recipes[6]
  // );

  // SELECTION LIST
  // addSelectionList(families[1]);
  // updateSelectionListName(families[1], selectionList[1], "Lunch");
  // toggleSelectionListStatus(families[1], selectionList[1]);
  // updateSelectionListSchedule(families[0], selectionList[0], null, 7, -7, -2);
  // getSelectionList(families[0], selectionList[0]);
  // listenSelectionList(families[0], selectionList[0]);
  // addToSelectionList(families[1], selectionList[1], recipes[0]);
  // deleteFromSelectionList(families[1], selectionList[1], recipes[0]);

  // MEAL PLAN
  // addMealPlan(families[1], selectionList[1]);
  // deleteMealPlan(families[1], selectionList[1], mealPlan[1]);
  // toggleMealPlanStatus(families[1], selectionList[1], mealPlan[1]);
  // console.log(getMealPlan(families[1], selectionList[1], mealPlan[1]));

  // NOT YET TESTED
  // calculateVotes(families[0], selectionList[0], mealPlan[0]);
  // SHOPPING LIST NOT YET TESTED
  // console.log(calculateShoppingList([511728]));

  // SHORT LIST
  // addShortList(users2[2], families[1], selectionList[1], mealPlan[1]);
  // NOT TESTED - console.log(deleteShortList(users[0], "ADvdgYTEqa4fo7MUCfSr"));
  getShortList(
    users2[0],
    families[1],
    selectionList[1],
    mealPlan[1],
    shortList2[0]
  );
  // console.log(addToShortList(users[2], shortList[2], recipes[3]));
  // console.log(deleteFromShortList(users[0], shortList[0], recipes[0]));
  // console.log(
  //   orderShortList(
  //     users[1],
  //     shortList[1],
  //     [648432, 652134, 654812, 654857, 654959, 664786, 716627],
  //     true
  //   )
  // );

  return (
    <View>
      <Text style={{ textAlign: "center", marginTop: 300 }}>Recipe Page</Text>
      <Button title="Add to shortlist" onPress={{}} />
      <Button title="Add to favourites" onPress={{}} />
    </View>
  );
};

export default RecipePage;
