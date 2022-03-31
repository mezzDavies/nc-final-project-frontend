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
import { auth } from "../../firebase";
import { Ionicons } from "@expo/vector-icons";
import styles from "./components/SelectionStyles";
import UserNotLoggedIn from "../UserNotLoggedIn";

//----------COMPONENT----------
const SelectionListScreen = ({ navigation }) => {
  //-----Declarations-----
  const [userStatus, setUserStatus] = useState(false);
  const [familyStatus, setFamilyStatus] = useState(false);
  const [familyId, setFamilyId] = useState([]);
  const [userId, setUserId] = useState([]);
  const [selectionListId, setSelectionListId] = useState([]);
  const [idArray, setIdArray] = useState([]);
  const [selectionList, setSelectionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mealPlanId, setMealPlanId] = useState("");
  const [shortListId, setShortlistId] = useState("");

  useEffect(() => {
    setIsLoading(true);
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setUserStatus(true);
        getUserDataAndClaims()
          .then(({ claims, userData, newUserId }) => {
            if (!userData.groupIds?.length > 0) {
              setFamilyStatus(false);
              setIsLoading(false);
              return Promise.reject({
                status: 400,
                message: "Not a member of a group",
              });
            }
            setFamilyStatus(true);
            setUserId(newUserId);
            const newFamilyId = userData.groupIds[0];
            setFamilyId(newFamilyId);
            const currentIds = {
              user: newUserId,
              family: newFamilyId,
            };
            return currentIds;
          })
          .then((currentIds) => {
            return Promise.all([
              currentIds,
              getSelectionLists(currentIds.family),
            ]);
          })
          .then(([currentIds, selectionId]) => {
            setSelectionListId(selectionId[0]);
            currentIds.selection = selectionId[0];
            return Promise.all([
              currentIds,
              getSelectionList(currentIds.family, currentIds.selection),
            ]);
          })
          .then(([currentIds, finalSelectionList]) => {
            setSelectionList(finalSelectionList);
            return Promise.all([
              currentIds,
              getMealPlans(currentIds.family, currentIds.selection),
            ]);
          })
          .then(([currentIds, result]) => {
            setMealPlanId(result[0].mealPlanId);
            currentIds.mealPlan = result[0].mealPlanId;
            return getShortListFromCollection(
              currentIds.user,
              currentIds.family,
              currentIds.selection,
              currentIds.mealPlan
            );
          })
          .then((result) => {
            setShortlistId(result[0].id);
            setIdArray(result[0].data.recipeIds);
            setIsLoading(false);
          })
          .catch((err) => {
            return err;
          });
      } else {
        setUserStatus(false);
        setFamilyStatus(false);
        setIsLoading(false);
      }
    });
  }, [userStatus, familyStatus]);

  if (isLoading) return <Text style={styles.loadingText}>Loading...</Text>;
  if (!userStatus) return <UserNotLoggedIn setUserStatus={setUserStatus} />;
  if (!familyStatus)
    return (
      <View
        style={{
          borderColor: "#DD1F13",
          borderWidth: 1,
          padding: 10,
          margin: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "700",
            padding: 40,
            color: "#DD1F13",
          }}
        >
          It looks like you're not part of a group yet, go to the Account tab at
          the bottom of the page to join a group.
        </Text>
      </View>
    );

  return (
    <ScrollView>
      <View>
        <View style={styles.introContainer}>
          <Text style={styles.intro}>
            Click{" "}
            <Ionicons name="add-circle-outline" color="#DD1F13" size={20} /> to
            vote for a recipe to be in the Meal Plan
          </Text>
          <Text style={styles.intro}>
            Click <Ionicons name="remove-circle" color="#DD1F13" size={20} /> to
            undo your vote for a recipe
          </Text>
        </View>
        <Text style={styles.spacing} />
        <View style={styles.recipes}>
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
      </View>
    </ScrollView>
  );
};

export default SelectionListScreen;
