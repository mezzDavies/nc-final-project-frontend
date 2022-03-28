import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import { calculateShoppingList } from "../api/firestoreFunctions.mealPlans";

const ShoppingListScreen = () => {
  const [recipeIds, setRecipeIds] = useState([652134, 511728, 648432]);
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    calculateShoppingList(recipeIds).then((res) => {
      console.log(res);
      setShoppingList(res);
    });
  }, []);

  return (
    <ScrollView>
      <View>
        <Text style={{ textAlign: "center", marginTop: 15 }}>
          Shopping List
        </Text>
      </View>
      <View>
        {shoppingList.map((listItem) => {
          return (
            <Text
              key={listItem.id}
            >{`${listItem.name} - ${listItem.amount} ${listItem.unit}`}</Text>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default ShoppingListScreen;
