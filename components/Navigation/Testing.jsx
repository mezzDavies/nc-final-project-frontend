import React from "react";
import { View, Text } from "react-native";
import {
  addMealPlan,
  addSelectionList,
  addToSelectionList,
  addShortList,
  addUserToFamily,
  deleteMealPlan,
  deleteFromShortList,
  deleteShortList,
  getFamily,
  getMealPlan,
  getShortList,
  toggleFamilyStatus,
  toggleSelectionListStatus,
  addToShortList,
  orderShortList,
  listenFamily,
  updateFamilyName,
  calculateShoppingList,
} from "../../api/firestoreFunctions";

const users = [
  "ItsERU60MCYeXcSCtXJeaBR1JQa2",
  "YVe2KaPpzkO4r7tzbCdmFyYjhvv2",
  "v9bCzL6TvlYNToUaQD752kQlzk53",
];
const family = "Fxj4fb7gWPdFCKDCa5K9";
const selectionList = "bo2XEWgWaO8Y1VWtxi2j";
const shortList = [
  "Noz4m8tbdpsFtlJUWefj",
  "wtXteKeKI3lNQyy1AUDw",
  "KFLpgaHYrjcVcDLR9o4N",
];
const mealPlan = "";
const recipes = [
  1697787, 511728, 648432, 652134, 654812, 654857, 654959, 664786, 716627,
];

const TestingPage = () => {
  // console.log(addSelectionList("PE3gVlyg7xiqU7kGXuix"));

  // FAMILY
  //addUserToFamily(users[2], "Fxj4fb7gWPdFCKDCa5K9");
  // console.log(updateFamilyName(family, "The Adams Family"));
  //console.log(getFamily(family));
  // console.log(listenFamily(family));

  // SELECTION LIST
  // console.log(
  //   toggleSelectionListStatus("PE3gVlyg7xiqU7kGXuix", "oFmv4Sdt3da6qtvOOP0Z")
  // );
  // addToSelectionList(
  //   "Fxj4fb7gWPdFCKDCa5K9",
  //   "bo2XEWgWaO8Y1VWtxi2j",
  //   recipes[6]
  // );

  // SHORT LIST
  // console.log(
  //   addShortList(users[0], "Fxj4fb7gWPdFCKDCa5K9", "bo2XEWgWaO8Y1VWtxi2j")
  // );
  // console.log(deleteShortList(users[0], "ADvdgYTEqa4fo7MUCfSr"));
  // console.log(getShortList(users[0], shortList[0]));
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

  // MEAL PLAN
  // console.log(addMealPlan("Fxj4fb7gWPdFCKDCa5K9"));
  // console.log(deleteMealPlan("Fxj4fb7gWPdFCKDCa5K9", "GzOwwhcLUc2EdwzdH4lp"));
  // console.log(getMealPlan("Fxj4fb7gWPdFCKDCa5K9", "thgTxhkwsH73b7E49Rta"));

  // SHOPPING LIST
  console.log(calculateShoppingList([511728]));

  return (
    <View>
      <Text style={{ textAlign: "center", marginTop: 300 }}>
        Welcome to testing!!!
      </Text>
    </View>
  );
};

export default TestingPage;
