import { Text, Image, View } from "react-native";

const RecipeCard = ({ recipe }) => {
  const { id, title, image, instructions, readyInMinutes, servings, summary } =
    recipe;
  return (
    <View>
      <Image source={{ uri: image }} />
      <Text>{`Recipe Title: ${title}`}</Text>
    </View>
  );
};

export default RecipeCard;
