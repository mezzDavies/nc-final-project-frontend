import { Text, Image, View, TouchableHighlight } from "react-native";

const RecipeCard = ({ recipe }) => {
  const { id, title, image, instructions, readyInMinutes, servings, summary } =
    recipe;
  return (
    <View>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("RecipePage", { id });
        }}
      >
        <Image source={{ uri: image }} style={{ width: 400, height: 400 }} />
      </TouchableHighlight>
      <Text>{`Recipe Title: ${title}`}</Text>
    </View>
  );
};

export default RecipeCard;
