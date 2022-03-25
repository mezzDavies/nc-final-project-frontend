import React, { useState, useEffect } from "react";
import { Text, View, Button, ScrollView } from "react-native";
import {
  getMealPlan,
  toggleMealPlanStatus,
} from "../../../api/firestoreFunctions.mealPlans";
import { getRecipeById } from "../../../api/firestoreFunctions.recipes";
import MealPlanCard from "./MealPlanCard";

const MealPlanList = ({ navigation }) => {
  const familyId = "yPRj8Q1cEgwJ465bec04";
  const selectionListId = "oeAuz0njIbYyPeLUqpUw";
  const mealPlanId = "V00CM4zYfykUNjxUXI80";

  const [mealPlan, setMealPlan] = useState([]);
  const [mealPlanConfirmation, setMealPlanConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) return <Text>Is Loading...</Text>;

  return (
    <ScrollView>
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
            mealPlanConfirmation
              ? "Meal Plan Already Confirmed"
              : "Confirm Your Meal Plan"
          }
          onPress={() => {
            toggleMealPlanStatus(familyId, selectionListId, mealPlanId);
            setMealPlanConfirmation((currentMealPlanConfirmation) => {
              return !currentMealPlanConfirmation;
            });
          }}
          disabled={mealPlanConfirmation}
        />
      </View>
    </ScrollView>
  );
};

export default MealPlanList;
