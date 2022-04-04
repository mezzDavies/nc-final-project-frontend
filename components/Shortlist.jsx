import React from "react";
import { Button } from "react-native";

const ShortList = ({ route }) => {
  console.log(route.params.recipeId);

  const upOne = (arr, i) => {
    if (i > 0 && i < arr.length) {
      return [
        ...arr.slice(0, i - 1),
        ...arr.slice(i, i + 1),
        ...arr.slice(i - 1, i),
        ...arr.slice(i + 1),
      ];
    } else {
      return [...arr];
    }
  };

  const downOne = (arr, i) => {
    if (i >= 0 && i < arr.length - 1) {
      return [
        ...arr.slice(0, i),
        ...arr.slice(i + 1, i + 2),
        ...arr.slice(i, i + 1),
        ...arr.slice(i + 2),
      ];
    } else {
      return [...arr];
    }
  };

  return (
    <Button title="Add to shortlist" onPress={() => console.log(recipeId)} />
  );
};

export default ShortList;
