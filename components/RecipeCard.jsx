import { Text, Image, View, ScrollView } from "react-native";

const RecipeCard = ({ recipe }) => {
  const { id, title, image, instructions, readyInMinutes, servings, summary } =
    recipe;
  return (
    <View>
      <Image source={{ uri: image }} style={{ width: 400, height: 400 }} />
      <Text>{`Recipe Title: ${title}`}</Text>
    </View>
  );
};

export default RecipeCard;
