import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { getSelectionList } from "../../api/firestoreFunctions.selectionLists";
import SelectionListCard from "./components/SelectionListCard";
import getUserDataAndClaims from "../../utils/getUserDataAndClaims";
import { getFamilies } from "../../api/firestoreFunctions.families";
import { getSelectionLists } from "../../api/firestoreFunctions.selectionLists";

const SelectionListScreen = ({ navigation }) => {
  const [familyId, setFamilyId] = useState([]);
  const [userId, setUserId] = useState([]);
  const [selectionListId, setSelectionListId] = useState([]);
  const [idArray, setIdArray] = useState([]);
  const [selectionList, setSelectionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    getUserDataAndClaims()
      .then(({ claims, userData, newUserId }) => {
        setUserId(newUserId);
        return newUserId;
      })
      .then((userId) => {
        return getFamilies(userId)
          .then((familyId) => {
            setFamilyId(familyId[0]);
            return familyId[0];
          })
          .then((res) => {
            getSelectionLists(res)
              .then((selectionId) => {
                setSelectionListId(selectionId[0]);
                const newFamilyId = res;
                const newSelectionListId = selectionId[0];
                return Promise.all([newFamilyId, newSelectionListId]);
              })
              .then(([newFamilyId, newSelectionListId]) => {
                return getSelectionList(newFamilyId, newSelectionListId);
              })
              .then((finalSelectionList) => {
                setSelectionList(finalSelectionList);
              });
          });
      });
  }, []);

  console.log(selectionList);

  // if (isLoading) return <Text>Loading...</Text>;

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
