import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { getSelectionList } from "../../api/firestoreFunctions";
import SelectionListCard from "./components/SelectionListCard";

const familyId = "yPRj8Q1cEgwJ465bec04";
const selectionListId = "oeAuz0njIbYyPeLUqpUw";

const SelectionListScreen = ({ navigation }) => {
  const [selectionList, setSelectionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getSelectionList(familyId, selectionListId)
      .then(({ recipeIds }) => {
        setSelectionList(recipeIds);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <ScrollView>
      <View>
        {selectionList.map((recipeId, index) => {
          return (
            <SelectionListCard
              recipeId={recipeId}
              selectionListId={selectionListId}
              familyId={familyId}
              setSelectionList={setSelectionList}
              key={`${recipeId} - ${index}`}
              navigation={navigation}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default SelectionListScreen;
