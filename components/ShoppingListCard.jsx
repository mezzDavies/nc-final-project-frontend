import { Switch, Text, View, CheckBox } from "react-native";
import { useState } from "react";
import styles from "./ShoppingStyles";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const ShoppingListCard = ({ listItem }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <BouncyCheckbox
          size={25}
          fillColor="#53a369"
          unfillColor="#FFFFFF"
          text={
            <Text
              style={styles.label}
            >{`${listItem.name}: ${listItem.amount} ${listItem.unit}`}</Text>
          }
          iconStyle={{ borderColor: "red" }}
          textStyle={{ fontFamily: "JosefinSans-Regular" }}
          onPress={() => {
            setIsChecked((current) => !current);
          }}
        />
        {/* <CheckBox
          value={isSelected}
          onValueChange={setIsSelected}
          style={styles.checkbox}
        /> */}
      </View>
    </View>
  );
};

export default ShoppingListCard;
