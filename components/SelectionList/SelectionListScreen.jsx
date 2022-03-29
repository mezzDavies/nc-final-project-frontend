//IMPORTS - react
import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";

//IMPORTS - firebase
import { getSelectionList } from "../../api/firestoreFunctions.selectionLists";
import { getSelectionLists } from "../../api/firestoreFunctions.selectionLists";

//IMPORTS - components & utils
import SelectionListCard from "./components/SelectionListCard";
import getUserDataAndClaims from "../../utils/getUserDataAndClaims";
import { getMealPlans } from "../../api/firestoreFunctions.mealPlans";
import { getShortListFromCollection } from "../../api/firestoreFunctions.shortLists";

//----------COMPONENT----------
const SelectionListScreen = ({ navigation }) => {
  //-----Declarations-----
  const [familyId, setFamilyId] = useState([]);
  const [userId, setUserId] = useState([]);
  const [selectionListId, setSelectionListId] = useState([]);
  const [idArray, setIdArray] = useState([]);
  const [selectionList, setSelectionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mealPlanId, setMealPlanId] = useState('');
  const [shortListId, setShortlistId] = useState('');


  useEffect(() => {
    setIsLoading(true);
    getUserDataAndClaims()
      .then(({ claims, userData, newUserId }) => {
        setUserId(newUserId);
        const newFamilyId = userData.groupIds[0]
        setFamilyId(newFamilyId)
        const currentIds = {
          user: newUserId,
          family: newFamilyId
        }
        return currentIds;
      })
      .then((currentIds) => {
        return Promise.all([currentIds, getSelectionLists(currentIds.family)])
      })
      .then(([currentIds, selectionId]) => {
        setSelectionListId(selectionId[0]);
        currentIds.selection = selectionId[0]
        return Promise.all([currentIds, getSelectionList(currentIds.family, currentIds.selection)])
      })
      .then(([currentIds, finalSelectionList]) => {
        setSelectionList(finalSelectionList);
        return Promise.all([currentIds, getMealPlans(currentIds.family, currentIds.selection)])
      })
      .then(([currentIds, result]) => {
        setMealPlanId(result[0].mealPlanId);
        currentIds.mealPlan = result[0].mealPlanId;
        return getShortListFromCollection(currentIds.user, currentIds.family, currentIds.selection, currentIds.mealPlan)
      })
      .then((result) => {
        setShortlistId(result[0].id);
        setIdArray(result[0].data.recipeIds);
        setIsLoading(false);
      })
  }, []);

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <ScrollView>
      <View>
        {selectionList.map((recipeId, index) => {
          return (
            <SelectionListCard
              idArray={idArray}
              setIdArray={setIdArray}
              recipeId={recipeId}
              selectionListId={selectionListId}
              familyId={familyId}
              setSelectionList={setSelectionList}
              userId={userId}
              mealPlanId={mealPlanId}
              shortListId={shortListId}
              key={`${recipeId} - ${index}`}
              navigation={navigation}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default SelectionListScreen;
