import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button, Switch } from "react-native";
import { getSelectionLists } from "../api/firestoreFunctions.selectionLists";
import { getMealPlan, getMealPlans } from "../api/firestoreFunctions.mealPlans";
import getUserDataAndClaims from "../utils/getUserDataAndClaims";
import ShoppingListCard from "./ShoppingListCard";
import { auth } from "../firebase";
import UserNotLoggedIn from "./UserNotLoggedIn";
import styles from "./ShoppingStyles";

const ShoppingListScreen = () => {
  const [userStatus, setUserStatus] = useState(false);
  const [familyStatus, setFamilyStatus] = useState(false);
  const [shoppingList, setShoppingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
                message: "Not a member of any group",
              });
            } else {
              setFamilyStatus(true);
              const currentIds = {
                user: newUserId,
                family: userData.groupIds[0],
              };
              return Promise.all([
                currentIds,
                getSelectionLists(currentIds.family),
              ]);
            }
          })
          .then(([currentIds, newSelectionId]) => {
            currentIds.selection = newSelectionId[0];
            return Promise.all([
              currentIds,
              getMealPlans(currentIds.family, currentIds.selection),
            ]);
          })
          .then(([currentIds, newMealPlanId]) => {
            currentIds.mealPlan = newMealPlanId[0].mealPlanId;
            return getMealPlan(
              currentIds.family,
              currentIds.selection,
              currentIds.mealPlan
            );
          })
          .then((mealPlan) => {
            setShoppingList(mealPlan.shoppingList);
            setIsLoading(false);
          })
          .catch((err) => {
            return err;
          });
      } else {
        setUserStatus(false);
        setShoppingList([]);
        setIsLoading(false);
      }
    });
  }, [userStatus]);

  if (isLoading) return <Text>Loading...</Text>;
  if (!userStatus) return <UserNotLoggedIn setUserStatus={setUserStatus} />;
  if (!familyStatus)
    return (
      <Text>
        It looks like you're not part of a group yet, take a look at the
        household page under your account.
      </Text>
    );

  return (
    <ScrollView>
      <View style={styles.list}>
        <View style={styles.container}>
          <Text style={styles.title}>This Week's Shopping List:</Text>
          {shoppingList.map((listItem, index) => {
            return (
              <ShoppingListCard
                listItem={listItem}
                key={`${listItem.id} + ${index}`}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default ShoppingListScreen;
