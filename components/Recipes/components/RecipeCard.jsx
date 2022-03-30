import { Text, Image, View, TouchableHighlight } from "react-native";
import styles from "./Styles";

const RecipeCard = ({ recipe, navigation }) => {
  const { id, title, image, instructions, readyInMinutes, servings, summary } =
    recipe;

  console.log(id);

  return (
    <View style={styles.recipe}>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("RecipePage", { id });
        }}
      >
        <Image source={{ uri: image }} style={styles.image} />
      </TouchableHighlight>
      <Text style={(styles.recipeInfo, styles.recipeTitle)}>{`${title}`}</Text>
      <Text style={styles.recipeInfo}>
        Ready in {readyInMinutes} minutes | Serves {servings}
      </Text>
      <Text style={styles.dividingLine} />
    </View>
  );
};

export default RecipeCard;
