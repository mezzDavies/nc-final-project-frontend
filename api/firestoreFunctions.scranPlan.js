// lodash
// import _ from "lodash";

import {
  collection,
  doc,
  getDoc,
  runTransaction,
  Timestamp,
} from "firebase/firestore";

import { getMealPlans } from "./firestoreFunctions.mealPlans";
import { getShortLists } from "./firestoreFunctions.shortLists";

// import app from "../firebase";
import { fireDB } from "../firebase";

// This is the original version.
// It works but doesn't use the transaction functionality
// I'll delete it before we go live
// async function addScranPlanTransaction(familyId) {
//   try {
//     await runTransaction(fireDB, async () => {
//       const familyDoc = await getFamily(familyId);
//       const selectionListRef = await addSelectionList(familyId);
//       const mealPlanRef = await addMealPlan(familyId, selectionListRef);
//       await familyDoc.family.familyMembers.forEach((member) => {
//         addShortList(member, familyId, selectionListRef, mealPlanRef);
//       });
//       console.log("did it work!");
//     });
//   } catch (e) {
//     console.error(e);
//   }
// }

async function addScranPlan(familyId) {
  // Uses the current local time to set the scran plan start date to 0000 on the next Monday.
  function setStartDate() {
    const start = new Date();
    start.setDate(start.getDate() + ((((7 - start.getDay()) % 7) + 1) % 7));
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    return start;
  }

  const familyRef = doc(fireDB, "families", familyId);
  const scranPlanRef = doc(
    collection(fireDB, `families/${familyId}/selectionLists`)
  );
  const mealPlanRef = doc(
    collection(
      fireDB,
      `families/${familyId}/selectionLists/${scranPlanRef.id}/mealPlans`
    )
  );

  try {
    await runTransaction(fireDB, async (transaction) => {
      const familyDoc = await transaction.get(familyRef);

      if (!familyDoc.exists()) {
        throw new Error("Document does not exist!");
      }

      const familyMembers = familyDoc.get("familyMembers");

      transaction.set(scranPlanRef, {
        createdAt: Timestamp.fromDate(new Date()),
        listName: "Dinner",
        isActive: true,
        startDate: Timestamp.fromDate(setStartDate()),
        planLength: 7,
        planOpen: -7,
        planConfirm: -2,
        recipeIds: [],
      });

      transaction.set(mealPlanRef, {
        createdAt: Timestamp.fromDate(new Date()),
        isConfirmed: false,
        recipeIds: [],
        shoppingList: [],
      });

      familyMembers.forEach((member) => {
        const shortListRef = doc(
          collection(
            fireDB,
            `families/${familyId}/selectionLists/${scranPlanRef.id}/mealPlans/${mealPlanRef.id}/shortLists`
          )
        );
        transaction.set(shortListRef, {
          createdAt: Timestamp.fromDate(new Date()),
          isConfirmed: false,
          userId: member,
          familyId: familyRef.id,
          selectionListId: scranPlanRef.id,
          mealPlanId: mealPlanRef.id,
          recipeIds: [],
        });
      });
      console.log("Transaction successfully committed");
    });
    return scranPlanRef.id;
  } catch (e) {
    console.error(e);
  }
  return "success";
}

// This is the logic for turning the numbers stored in the scran plan schedule into javascript dates
function scheduleAsDates(startDate, planConfirm, planLength, planOpen) {
  const start = new Date(startDate);
  const end = new Date();
  end.setDate(start.getDate() + planLength);
  const open = new Date();
  open.setDate(start.getDate() + planOpen);
  const close = new Date();
  close.setDate(start.getDate() + planConfirm);
  return { startDate: start, planOpen: open, planEnd: end, planConfirm: close };
}

// View scranPlan info selectionList and mealPlanIds,
async function getScranPlan(familyId, selectionListId) {
  // get the selection list document
  const docRef = doc(
    fireDB,
    `families/${familyId}/selectionLists`,
    selectionListId
  );

  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return undefined;
  }

  // if it exists store the data in result
  const scranPlan = docSnap.data();

  // fireStore stores timestamps as numbers and provides a method to convert them:
  scranPlan.createdAt = docSnap.get("createdAt").toDate();
  scranPlan.startDate = docSnap.get("startDate").toDate();

  scranPlan.scheduleAsDates = scheduleAsDates(scranPlan.startDate, -2, 7, -7);

  // Based on current design there should only ever be one meal plan returned
  const mealPlans = await getMealPlans(familyId, selectionListId);

  // return all shortListsIds for this mealPlan and whether they are confirmed
  scranPlan.mealPlans = await mealPlans.map((item) => {
    const mealPlan = { ...item };
    mealPlan.shortListIds = getShortLists(
      familyId,
      selectionListId,
      item.mealPlanId
    );
    return mealPlan;
  });

  return scranPlan;
}

export { addScranPlan, getScranPlan };
