//IMPORTS - lodash
import _ from "lodash";

//IMPORTS - firebase
import {
  arrayRemove,
  arrayUnion,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
  runTransaction,
} from "firebase/firestore";
import { fireDB } from "../firebase";

// Create a new shortList for the current user
// This is probably best triggered as an admin function when a user is added to a group

async function addShortList(userId, familyId, selectionListId, mealPlanId) {
  try{
    const docRef = await addDoc(
      collection(
        fireDB,
        `/families/${familyId}/selectionLists/${selectionListId}/mealPlans/${mealPlanId}/shortLists`
      ),
      {
        createdAt: Timestamp.fromDate(new Date()),
        isConfirmed: false,
        userId,
        familyId,
        selectionListId,
        mealPlanId,
        recipeIds: [],
      }
    );
    return docRef.id;
  } catch(err) {
    return err;
  }
};

async function deleteShortList(
  userId,
  familyId,
  selectionListId,
  mealPlanId,
  shortListId
) {
  await deleteDoc(
    doc(
      fireDB,
      `/families/${familyId}/selectionLists/${selectionListId}/mealPlans/${mealPlanId}/shortLists`,
      shortListId
    )
  );
  console.log("short list removed: ", shortListId);
}

async function getShortLists(familyId, selectionListId, mealPlanId) {
  const querySnapshot = await getDocs(
    collection(
      fireDB,
      `/families/${familyId}/selectionLists/${selectionListId}/mealPlans/${mealPlanId}/shortLists`
    )
  );
  const result = [];
  querySnapshot.forEach((shortList) => {
    result.push({
      shortListId: shortList.id,
      isConfirmed: shortList.get("isConfirmed"),
    });
  });
  return result;
}

// When you don't know the users shortListId you can use this function
// You can then call getRecipesById to view recipe details

async function getShortListFromCollection(
  userId,
  familyId,
  selectionListId,
  mealPlanId
) {
  try{
    const q = query(collection(fireDB, `families/${familyId}/selectionLists/${selectionListId}/mealPlans/${mealPlanId}/shortLists`), where("userId", "==", `${userId}`));

    const result = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      result.push({id: doc.id, data: doc.data()})
    });

    return result;
  } catch(err) {
    return err
  }
}

// View the current RecipeIds in a shortList
// You can then call getRecipesById to view recipe details

async function getShortList(
  userId,
  familyId,
  selectionListId,
  mealPlanId,
  shortListId
) {
  const docRef = doc(
    fireDB,
    `/families/${familyId}/selectionLists/${selectionListId}/mealPlans/${mealPlanId}/shortLists`,
    shortListId
  );
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Document does not exist!");
  }
  if (userId !== docSnap.data().userId) {
    throw new Error("User is not permitted to edit this shortList");
  }

  console.log("Document data:", docSnap.get("recipeIds"));
  return docSnap.data();
}

// Adds a recipeId to a shortList

// async function addToShortList(
//   userId,
//   familyId,
//   selectionListId,
//   mealPlanId,
//   shortListId,
//   recipeId
// ) {
//   const docRef = doc(
//     fireDB,
//     `/families/${familyId}/selectionLists/${selectionListId}/mealPlans/${mealPlanId}/shortLists`,
//     shortListId
//   );

//   await updateDoc(docRef, {
//     recipeIds: arrayUnion(recipeId),
//   });
//   console.log("Added - shortList: ", docRef.id, "recipeId: ", recipeId);

//   return docRef.id;
// }

// This version limits recipeIds to 7 and userIds must match
async function addToShortList(
  userId,
  familyId,
  selectionListId,
  mealPlanId,
  shortListId,
  recipeId
) {
  const shortListRef = doc(
    fireDB,
    `/families/${familyId}/selectionLists/${selectionListId}/mealPlans/${mealPlanId}/shortLists`,
    shortListId
  );

  try {
    await runTransaction(fireDB, async (transaction) => {
      const shortListDoc = await transaction.get(shortListRef);
      if (!shortListDoc.exists()) {
        throw new Error("Document does not exist!");
      }

      if (userId !== shortListDoc.data().userId) {
        throw new Error("User is not permitted to edit this shortList");
      }
      // if (shortListDoc.data().recipeIds.length >= 7) {
      //   throw new Error("Short List is full. Remove items firs");
      // }

      transaction.update(shortListRef, {
        recipeIds: arrayUnion(recipeId),
      });

      return shortListRef.id;
    });
  } catch (e) {
    console.log(e);
  }
}

// Deletes a recipeId from a shortList
// async function deleteFromShortList(
//   userId,
//   familyId,
//   selectionListId,
//   mealPlanId,
//   shortListId,
//   recipeId
// ) {
//   const docRef = doc(
//     fireDB,
//     `/families/${familyId}/selectionLists/${selectionListId}/mealPlans/${mealPlanId}/shortLists`,
//     shortListId
//   );

//   await updateDoc(docRef, {
//     recipeIds: arrayRemove(recipeId),
//   });
//   console.log("Deleted - shortList: ", docRef.id, "recipeId: ", recipeId);

//   return docRef.id;
// }

async function deleteFromShortList(
  userId,
  familyId,
  selectionListId,
  mealPlanId,
  shortListId,
  recipeId
) {
  const shortListRef = doc(
    fireDB,
    `/families/${familyId}/selectionLists/${selectionListId}/mealPlans/${mealPlanId}/shortLists`,
    shortListId
  );

  try {
    await runTransaction(fireDB, async (transaction) => {
      const shortListDoc = await transaction.get(shortListRef);
      if (!shortListDoc.exists()) {
        throw new Error("Document does not exist!");
      }

      if (userId !== shortListDoc.data().userId) {
        throw new Error("User is not permitted to edit this shortList");
      }

      transaction.update(shortListRef, {
        recipeIds: arrayRemove(recipeId),
      });

      return shortListRef.id;
    });
  } catch (e) {
    console.log(e);
  }
}

// Order shortList (prioritise)
// allow isConfrmed to be set to true (but not changed back to false)
async function orderShortList(
  userId,
  familyId,
  selectionListId,
  mealPlanId,
  shortListId,
  recipeIds,
  isConfirmed
) {
  const params = _.pickBy({ recipeIds, isConfirmed }, (value) => !!value);

  const docRef = doc(
    fireDB,
    `/families/${familyId}/selectionLists/${selectionListId}/mealPlans/${mealPlanId}/shortLists`,
    shortListId
  );

  await updateDoc(docRef, params);

  return docRef.id;
}

export {
  addShortList,
  addToShortList,
  deleteFromShortList,
  deleteShortList,
  getShortList,
  getShortListFromCollection,
  getShortLists,
  orderShortList,
};
