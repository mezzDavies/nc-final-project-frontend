//IMPORTS - react
import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";

//IMPORTS - firebase
import {
  getMealPlan,
  toggleMealPlanStatus,
} from "../../../api/firestoreFunctions.mealPlans";
import MealPlanCard from "./MealPlanCard";
import { getMealPlans } from "../../../api/firestoreFunctions.mealPlans";
import { getRecipeCardById } from "../../../api/firestoreFunctions.recipes";
import {
  getSelectionLists,
  getSelectionList,
} from "../../../api/firestoreFunctions.selectionLists";
import { getFamilies } from "../../../api/firestoreFunctions.families";
import { getShortListsCgBy } from "../../../api/fireStoreFunctions.collectionGroup";

//IMPORTS - components & utils
import getUserDataAndClaims from "../../../utils/getUserDataAndClaims";

//----------COMPONENT-----------
const MealPlanList = ({ navigation }) => {
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
  const [settingDays, setSettingDays] = useState(true);
  const [useEffectLoading, setUseEffectLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);
  //   getUserDataAndClaims()
  //     .then(({ claims, userData, newUserId }) => {
  //       setUserId(newUserId);
  //       return newUserId;
  //     })
  //     .then((userId) => {
  //       return getFamilies(userId)
  //         .then((familyId) => {
  //           setFamilyId(familyId[0]);
  //           return familyId[0];
  //         })
  //         .then((res) => {
  //           getSelectionLists(res)
  //             .then((selectionId) => {
  //               setSelectionListId(selectionId[0]);
  //               const newFamilyId = res;
  //               const newSelectionListId = selectionId[0];
  //               return Promise.all([newFamilyId, newSelectionListId]);
  //             })
  //             .then(([newFamilyId, newSelectionListId]) => {
  //               return Promise.all([
  //                 getSelectionList(newFamilyId, newSelectionListId),
  //                 newFamilyId,
  //                 newSelectionListId,
  //               ]);
  //             })
  //             .then(([finalSelectionList, newFamilyId, newSelectionListId]) => {
  //               setSelectionList(finalSelectionList[0]);
  //               const mealPlanId = getMealPlans(
  //                 newFamilyId,
  //                 newSelectionListId
  //               );
  //               return Promise.all([
  //                 newFamilyId,
  //                 newSelectionListId,
  //                 mealPlanId,
  //               ]);
  //             })
  //             .then(([newFamilyId, newSelectionListId, mealPlanIdentity]) => {
  //               setMealPlanId(mealPlanIdentity[0].mealPlanId);
  //               return getMealPlan(
  //                 newFamilyId,
  //                 newSelectionListId,
  //                 mealPlanIdentity[0].mealPlanId
  //               );
  //             })
  //             .then((mealPlan) => {
  //               setMealPlan(mealPlan.recipeIds);
  //               return Promise.all([
  //                 mealPlan.recipeIds.map((recipe) => getRecipeCardById(recipe)),
  //               ]);
  //             })
  //             .then(([recipeCards]) => {
  //               return Promise.all(recipeCards);
  //             })
  //             .then((result) => {
  //               setRecipeCards(result);
  //               setIsLoading(false);
  //             });
  //         });
  //     });
  // }, []);

  useEffect(() => {
    setUseEffectLoading(true);
    setIsLoading(true);
    getUserDataAndClaims()
      .then(({ claims, userData, newUserId }) => {
        setUserId(newUserId);
        return newUserId;
      })
      .then((userId) => {
    return getShortListsCgBy(userId);
      })
      .then((res) => {
        setFamilyId(res[0].familyId);
        setSelectionListId(res[0].selectionListId);
        setMealPlanId(res[0].mealPlanId);
        return getMealPlan(
          res[0].familyId,
          res[0].selectionListId,
          res[0].mealPlanId
        );
      })
      .then((mealPlan) => {
       setMealPlan(mealPlan.recipeIds);
       return Promise.all([
       mealPlan.recipeIds.map((recipe) => getRecipeCardById(recipe)),
      ]);
           })
             .then(([recipeCards]) => {
              return Promise.all(recipeCards);
              })
              .then((result) => {
                setRecipeCards(result);
                setIsLoading(false);
                setUseEffectLoading(false);
              });
          });
  }, []);

  useEffect(() => {
    getUserDataAndClaims()
      .then(({ claims, useData }) => {
        console.log(claims.parent);
        if (claims.parent) setIsChild(false);
        else setIsChild(true);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!useEffectLoading) {
      Promise.all([mealPlan.map((recipe) => getRecipeCardById(recipe))])
        .then(([recipeCards]) => {
          return Promise.all(recipeCards);
        })
        .then((result) => {
          setRecipeCards(result);
          setIsLoading(false);
        });
    }
  }, [mealPlan, settingDays]);

  if (isLoading) return <Text>Is Loading...</Text>;

  return (
    <View>
      <Text>
        Meal Plan contents:
        {recipeCards.map((recipe, index) => {
          return (
            <MealPlanCard
              setSettingDays={setSettingDays}
              mealPlan={mealPlan}
              setMealPlan={setMealPlan}
              index={index}
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

//a button which changes the isConfirmed to true
// then can edit order of list depending on days

//function = toggleMealPlanStatus(familyId, selectionListId, mealPlanId)
