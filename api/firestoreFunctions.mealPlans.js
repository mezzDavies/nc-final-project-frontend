// lodash
// import _ from "lodash";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  runTransaction,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

// import app from "../firebase";
import { fireDB } from "../firebase";

// Creates a new mealPlan for a family
// At the moment we should only allow one per family
// This could be created automatically when a user creates the family

async function addMealPlan(familyId, selectionListId) {
  const docRef = await addDoc(
    collection(
      fireDB,
      `families/${familyId}/selectionLists/${selectionListId}/mealPlans`
    ),
    {
      createdAt: Timestamp.fromDate(new Date()),
      isConfirmed: false,
      recipeIds: [],
      shoppingList: [],
    }
  );
  console.log(
    "mealPlanId: ",
    docRef.id,
    "familyId ",
    familyId,
    "selectionListId ",
    selectionListId
  );
  return docRef.id;
}

// For admin use only
async function deleteMealPlan(familyId, selectionListId, mealPlanId) {
  await deleteDoc(
    doc(
      fireDB,
      `families/${familyId}/selectionLists/${selectionListId}/mealPlans`,
      mealPlanId
    )
  );
  console.log("meal plan removed: ", mealPlanId);
}

// Deleting a document and all its sub-collections is an admin task.
// If we set an isActive flag to false we can schedule account deletion as an admin task.
// E.g. any groups inactive for more than time x should be deleted

async function toggleMealPlanStatus(familyId, selectionListId, mealPlanId) {
  const docRef = doc(
    fireDB,
    `families/${familyId}/selectionLists/${selectionListId}/mealPlans`,
    mealPlanId
  );
  const currIsConfirmed = (await getDoc(docRef)).get("isConfirmed");

  await updateDoc(docRef, {
    isConfirmed: !currIsConfirmed,
  });

  return !currIsConfirmed;
}

// Order mealPlan (days of the week) - only use after isConfirmed toggled to true
async function orderMealPlan(familyId, selectionListId, mealPlanId, recipeIds) {
  const docRef = doc(
    fireDB,
    `/families/${familyId}/selectionLists/${selectionListId}/mealPlans`,
    mealPlanId
  );

  await updateDoc(docRef, {
    recipeIds: recipeIds,
  });

  return docRef.id;
}

// async function calculateVotes(familyId, selectionListId, mealPlanId) {
//   const votes = {};

//   const querySnapshot = await getDocs(
//     collection(
//       fireDB,
//       `families/${familyId}/selectionLists/${selectionListId}/mealPlans/${mealPlanId}/shortLists`
//     )
//   );

//   await querySnapshot.forEach((shortList) => {
//     const points = shortList.data().recipeIds.length;

//     if (shortList.data().isConfirmed) {
//       shortList.data().recipeIds.forEach((recipeId, index) => {
//         if (Object.keys(votes).includes(recipeId.toString())) {
//           votes[recipeId] += points - index;
//         } else {
//           votes[recipeId] = points - index;
//         }
//       });
//     }
//   });

async function calculateVotes(familyId, selectionListId, mealPlanId) {
  const votes = {};

  const querySnapshot = await getDocs(
    collection(
      fireDB,
      `families/${familyId}/selectionLists/${selectionListId}/mealPlans/${mealPlanId}/shortLists`
    )
  );

  await querySnapshot.forEach((shortList) => {
    // if (shortList.data().isConfirmed) {
    shortList.data().recipeIds.forEach((recipeId) => {
      if (Object.keys(votes).includes(recipeId.toString())) {
        votes[recipeId] += 1;
      } else {
        votes[recipeId] = 1;
      }
    });
    // }
  });

  function getTopValues(obj, n) {
    const sortedEntries = Object.entries(obj).sort((a, b) => b[1] - a[1]);
    return sortedEntries.map((i) => i[0]).splice(0, n);
  }

  return getTopValues(votes, 7);
}

async function calculateShoppingList(recipeIds) {
  const shoppingList = [];

  console.log(recipeIds);

  const results = await recipeIds.map((recipeId) =>
    getDocs(collection(fireDB, `recipes/${recipeId}/ingredients`))
  );

  const querySnapshots = await Promise.all(results);

  await querySnapshots.forEach((ingredient) => {
    ingredient.forEach((i) => {
      const data = i.data();
      const item = {};
      item.id = data.id;
      item.name = data.name;
      item.amount = Math.ceil(data.measures.metric.amount);
      item.unit = data.measures.metric.unitLong;
      shoppingList.push(item);
    });
  });

  // function groupBy(objectArray, property) {
  //   return objectArray.reduce(function (acc, obj) {
  //     let key = obj[property];
  //     if (!acc[key]) {
  //       acc[key] = [];
  //     }
  //     acc[key].push(obj);
  //     return acc;
  //   }, {});
  // }

  // let listGrouped = groupBy(shoppingList, "id");
  // let listGroupedTotalled = { ...listGrouped };

  // for (const key in listGroupedTotalled) {
  //   const subGrouped = groupBy(listGroupedTotalled[key], "unit");
  //   listGroupedTotalled[key] = subGrouped;
  //   for (const prop in subGrouped) {
  //     const items = subGrouped[prop].length;
  //     const amount = subGrouped[prop].reduce((a, b) => a + b.amount, 0);
  //     const totalled = {
  //       ...subGrouped[prop][0],
  //       amount: amount,
  //       NumOfItems: items,
  //     };
  //     listGroupedTotalled[key][prop] = totalled;
  //   }
  // }

  // const listGroupedTotalledFlat = Object.keys(listGroupedTotalled).map(
  //   (key) => listGroupedTotalled[key]
  // );

  // console.log(shoppingList);
  // console.log(listGrouped);
  // console.log(listGroupedTotalled);
  // console.log(listGroupedTotalledFlat);

  return shoppingList;
}

// View all meal plans for a family
async function getMealPlans(familyId, selectionListId) {
  const collectionRef = collection(
    fireDB,
    `families/${familyId}/selectionLists/${selectionListId}/mealPlans`
  );

  const result = [];
  const querySnapshot = await getDocs(collectionRef);
  querySnapshot.forEach((mealPlan) => {
    result.push({
      mealPlanId: mealPlan.id,
      isConfirmed: mealPlan.get("isConfirmed"),
    });
  });

  console.log(result);
  return result;
}

// View a meal plan
// You can then call getRecipesById to view recipe details

async function getMealPlan(familyId, selectionListId, mealPlanId) {
  const docRef = doc(
    fireDB,
    `families/${familyId}/selectionLists/${selectionListId}/mealPlans`,
    mealPlanId
  );

  try {
    await runTransaction(fireDB, async (transaction) => {
      const docSnap = await transaction.get(docRef);
      if (!docSnap.exists()) {
        console.log("No such document!");
      } else if (!docSnap.get("isConfirmed")) {
        const recipeIds = await calculateVotes(
          familyId,
          selectionListId,
          mealPlanId
        );
        const shoppingList = await calculateShoppingList(recipeIds);
        transaction.update(docRef, {
          recipeIds,
          shoppingList,
        });
      }
    });
  } catch (e) {
    console.error(e);
  }

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log(docSnap.data());
    return docSnap.data();
  }
  // doc.data() will be undefined in this case
  console.log("No such document!");
  return undefined;
}

export {
  addMealPlan,
  calculateShoppingList,
  calculateVotes,
  deleteMealPlan,
  getMealPlan,
  getMealPlans,
  toggleMealPlanStatus,
  orderMealPlan,
};
