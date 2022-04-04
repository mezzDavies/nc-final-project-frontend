import { Text, Image, View, TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./Styles";

const RecipeCard = ({ recipe, navigation }) => {
  const { id, title, image, instructions, readyInMinutes, servings, summary } =
    recipe;

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
        <Ionicons
          name="timer-outline"
          size={17}
          color="#DD1F13"
          style={styles.icons}
        />
        Ready in {readyInMinutes} minutes |{" "}
        <Ionicons
          name="people-outline"
          size={17}
          color="#DD1F13"
          style={styles.peopleIcon}
        />
        Serves {servings}
      </Text>
      <Text style={styles.dividingLine} />
    </View>
  );
};

export default RecipeCard;
