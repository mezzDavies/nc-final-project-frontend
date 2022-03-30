import React from "react";
import { View, Text } from "react-native";

import { collectionGroupShortLists } from "../../api/firestoreFunctions.collectionGroups";

const TestingPage = () => {
  // familyId
  // console.log(collectionGroupShortLists("bVpbjsmiMggRnvOUAhjY"));
  // selectionListId
  // console.log(collectionGroupShortLists("jJ0OH1FRnheZao2Ep78g"));
  // mealPlanId
  // console.log(collectionGroupShortLists("6XgNzNi6uXaC2C5tIqQb"));
  // userId
  // console.log(collectionGroupShortLists("MkoVGdVZlga85oGI2aWLDHLc2jh2"));
  // recipeId
  // console.log(collectionGroupShortLists(634437));
  // isConfirmed
  console.log(collectionGroupShortLists(true));

  return (
    <View>
      <Text style={{ textAlign: "center", marginTop: 300 }}>
        Welcome to testing!!!
      </Text>
    </View>
  );
};

export default TestingPage;
