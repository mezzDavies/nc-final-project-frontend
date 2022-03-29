import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button, Switch } from "react-native";
import {
  getSelectionLists,
  getSelectionList,
} from "../api/firestoreFunctions.selectionLists";
import { getMealPlan, getMealPlans } from "../api/firestoreFunctions.mealPlans";
import getUserDataAndClaims from "../utils/getUserDataAndClaims";
import { getFamilies } from "../api/firestoreFunctions.families";
import ShoppingListCard from "./ShoppingListCard";

const ShoppingListScreen = () => {
  const [recipeIds, setRecipeIds] = useState([652134, 511728, 648432]);
  const [shoppingList, setShoppingList] = useState([]);
  const [mealPlan, setMealPlan] = useState([]);
  const [mealPlanConfirmation, setMealPlanConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isChild, setIsChild] = useState(false);
  const [familyId, setFamilyId] = useState("");
  const [selectionListId, setSelectionListId] = useState("");
  const [selectionList, setSelectionList] = useState("");
  const [userId, setUserId] = useState("");
  const [mealPlanId, setMealPlanId] = useState([]);
  const [recipeCards, setRecipeCards] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
                return Promise.all([
                  getSelectionList(newFamilyId, newSelectionListId),
                  newFamilyId,
                  newSelectionListId,
                ]);
              })
              .then(([finalSelectionList, newFamilyId, newSelectionListId]) => {
                setSelectionList(finalSelectionList[0]);
                const mealPlanId = getMealPlans(
                  newFamilyId,
                  newSelectionListId
                );
                return Promise.all([
                  newFamilyId,
                  newSelectionListId,
                  mealPlanId,
                ]);
              })
              .then(([newFamilyId, newSelectionListId, mealPlanIdentity]) => {
                setMealPlanId(mealPlanIdentity[0].mealPlanId);
                return getMealPlan(
                  newFamilyId,
                  newSelectionListId,
                  mealPlanIdentity[0].mealPlanId
                );
              })
              .then((mealPlan) => {
                setMealPlan(mealPlan.recipeIds);
                return Promise.all([mealPlan.shoppingList]);
              })
              .then(([newShoppingList]) => {
                setShoppingList(newShoppingList);
                setIsLoading(false);
              });
          });
      });
  }, []);

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <ScrollView>
      <View>
        <Text style={{ textAlign: "center", marginTop: 15 }}>
          Shopping List
        </Text>
      </View>
      <View>
        {shoppingList.map((listItem, index) => {
          return (
            <ShoppingListCard
              listItem={listItem}
              key={`${listItem.id} + ${index}`}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default ShoppingListScreen;
