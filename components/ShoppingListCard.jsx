import { Switch, Text, View, CheckBox } from "react-native";
import { useState } from "react";
import styles from "./ShoppingStyles";

const ShoppingListCard = ({ listItem }) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setIsSelected}
          style={styles.checkbox}
        />
        <Text
          style={styles.label}
        >{`${listItem.name} - ${listItem.amount} ${listItem.unit}`}</Text>
      </View>
    </View>
  );
};

export default ShoppingListCard;
