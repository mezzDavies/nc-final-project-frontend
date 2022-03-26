import { runTransaction } from "firebase/firestore";

// import app from "../firebase";
import { fireDB } from "../firebase";

import { addFamily, addUserToFamily } from "./firestoreFunctions.families";

import {
  updateSelectionListName,
  updateSelectionListSchedule,
  addSelectionList,
  addToSelectionList,
} from "./firestoreFunctions.selectionLists";

import { addMealPlan } from "./firestoreFunctions.mealPlans";

import { addShortList, orderShortList } from "./firestoreFunctions.shortLists";

const familyData = {
  groupName: "The Smiths",
  selectionList: {
    name: "Dinner for the Smiths",
    isActive: false,
    start: null,
    planLength: 14,
    planOpen: -7,
    planConfirm: -2,
    recipeIds: [
      1697787, 511728, 648432, 652134, 654812, 654857, 654959, 664786, 716627,
    ],
  },
  names: ["Joshua", "Simon", "Mezz", "Tanis"],
  users: [
    "DORNGMigcDayzaBKNqxv5Hxvhuw2",
    "T02OOSAIKdhTQjVul0PYgZ1I2Fz2",
    "UOEgttWxqTYulCJMXJT8ZQUVbNF3",
    "isavkFal1TPOvUPQZW4TqDL4dP62",
  ],
  shortList: {
    recipeIds: [
      [1697787, 511728, 648432],
      [652134, 654812, 654857],
      [654959, 664786, 716627],
      [1697787, 511728, 648432],
    ],
    isConfirmed: true,
  },
};

async function seedFamily(data) {
  try {
    await runTransaction(fireDB, async () => {
      // create the family and save the familyId
      const familyRef = await addFamily(data.users[0], data.groupName);

      // add each user in users array to the family
      await data.users.forEach((user) => {
        addUserToFamily(user, familyRef);
      });

      // create family scran plan and save selectionListId
      const selectionListRef = await addSelectionList(familyRef);

      // create family meal plan and save mealPlanId
      const mealPlanRef = await addMealPlan(familyRef, selectionListRef);

      // Change the name of the Scran plan
      await updateSelectionListName(
        familyRef,
        selectionListRef,
        data.selectionList.name
      );

      // Change the schedule for the Scran plan
      await updateSelectionListSchedule(
        familyRef,
        selectionListRef,
        data.selectionList.start,
        data.selectionList.planLength,
        data.selectionList.planOpen,
        data.selectionList.planConfirm
      );

      // Add recipes to families selection list
      await data.selectionList.recipeIds.forEach((recipeId) => {
        const interval = setInterval(
          addToSelectionList(familyRef, selectionListRef, recipeId),
          1000
        );
        clearInterval(interval);
      });
      // create shortList for each family member, add prioritized recipes and confirm
      await data.users.forEach((member, i) => {
        addShortList(member, familyRef, selectionListRef, mealPlanRef).then(
          (shortListRef) => {
            orderShortList(
              member,
              familyRef,
              selectionListRef,
              mealPlanRef,
              shortListRef,
              data.shortList.recipeIds[i],
              data.shortList.isConfirmed
            );
          }
        );
      });
      console.log("did it work!??? ");
      console.log("familyId", familyRef);
      console.log("selectionListId", selectionListRef);
      console.log("mealPlanId", mealPlanRef);
    });
  } catch (e) {
    console.error(e);
  }
}

export { seedFamily, familyData };
