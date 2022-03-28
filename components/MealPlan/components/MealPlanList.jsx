import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import {
  getMealPlan,
  toggleMealPlanStatus,
} from "../../../api/firestoreFunctions.mealPlans";
import { getRecipeById } from "../../../api/firestoreFunctions.recipes";
import getUserDataAndClaims from "../../../utils/getUserDataAndClaims";
import MealPlanCard from "./MealPlanCard";

const MealPlanList = ({ navigation }) => {
  const familyId = "yPRj8Q1cEgwJ465bec04";
  const selectionListId = "oeAuz0njIbYyPeLUqpUw";
  const mealPlanId = "V00CM4zYfykUNjxUXI80";

  const [mealPlan, setMealPlan] = useState([]);
  const [mealPlanConfirmation, setMealPlanConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isChild, setIsChild] = useState(false);

  useEffect(() => {
    getMealPlan(familyId, selectionListId, mealPlanId)
      .then(({ isConfirmed, recipeIds }) => {
        setMealPlanConfirmation(isConfirmed);
        return recipeIds;
      })
      .then((recipeIds) => {
        const recipes = recipeIds.map((id) => {
          return getRecipeById(id);
        });
        return Promise.all(recipes);
      })
      .then((recipes) => {
        return recipes.map((recipe) => {
          const { summary } = recipe;
          return summary;
        });
      })
      .then((recipes) => {
        setMealPlan(recipes);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getUserDataAndClaims()
      .then(({ claims, useData }) => {
        if (claims.parent) setIsChild(false);
        else setIsChild(true);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) return <Text>Is Loading...</Text>;

  return (
    <View>
      <Text>
        Meal Plan contents:
        {mealPlan.map((recipe, index) => {
          return (
            <MealPlanCard
              recipe={recipe}
              key={`${recipe.id} - ${index}`}
              navigation={navigation}
            />
          );
        })}
      </Text>
      <Button
        title={
          isChild
            ? "Only adult user can confirm Meal Plans"
            : mealPlanConfirmation
            ? "Meal Plan Already Confirmed"
            : "Confirm Your Meal Plan"
        }
        onPress={() => {
          toggleMealPlanStatus(familyId, selectionListId, mealPlanId);
          setMealPlanConfirmation((currentMealPlanConfirmation) => {
            return !currentMealPlanConfirmation;
          });
        }}
        disabled={isChild ? true : mealPlanConfirmation}
      />
    </View>
  );
};

export default MealPlanList;
