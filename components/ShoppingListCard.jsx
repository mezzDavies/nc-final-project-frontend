import { Switch, Text, View } from "react-native";
import { useState } from "react";

const ShoppingListCard = ({ listItem }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text>{`${listItem.name} - ${listItem.amount} ${listItem.unit}`}</Text>
    </View>
  );
};

export default ShoppingListCard;
