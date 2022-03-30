import { collectionGroup, getDocs, query, where } from "firebase/firestore";

// import app from "../firebase";
import { fireDB } from "../firebase";

async function getShortListsCgBy(userId) {
  const shortLists = query(
    collectionGroup(fireDB, "shortLists"),
    where("userId", "==", userId)
  );

  const results = [];
  const querySnapshot = await getDocs(shortLists);
  querySnapshot.forEach((doc) => {
    const path = doc.ref.path.split("/");
    const pathObj = {
      docId: doc.id,
      path,
      data: doc.data(),
      familyId: path[1],
      selectionListId: path[3],
      mealPlanId: path[5],
      shortListId: path[7],
    };

    console.log(pathObj);
    results.push(pathObj);
  });
  return results;
}

// For testing purposes:
async function collectionGroupShortLists(isConfirmed) {
  const shortLists = query(
    collectionGroup(fireDB, "shortLists"),
    // where("familyId", "==", familyId)
    // where("selectionListId", "==", selectionListId)
    // where("mealPlanId", "==", mealPlanId)
    // where("userId", "==", userId)
    // where("recipeIds", "array-contains", 634437)
    where("isConfirmed", "==", isConfirmed)
  );

  const results = [];
  const querySnapshot = await getDocs(shortLists);
  querySnapshot.forEach((doc) => {
    const path = doc.ref.path.split("/");
    results.push(path);
    const pathObj = {
      docId: doc.id,
      path,
      data: doc.data(),
      familyId: path[1],
      selectionListId: path[3],
      mealPlanId: path[5],
      shortListId: path[7],
    };

    console.log(pathObj);
    results.push(pathObj);
  });
  return results;
}

export { collectionGroupShortLists, getShortListsCgBy };
