import React, { useState, useEffect } from "react";
import { Button, View, Text } from "react-native";

import { useForm, Controller } from "react-hook-form";
import { FormTextField } from "../FormTextField";

import { addFamily } from "../../api/firestoreFunctions.families";

const CreateGroupScreen = ({ setFamilyStatus, userId, setUserId, firstName, setFirstName, navigation }) => {
  const [loadingMessage, setLoadingMessage] = useState("");
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const groupName = data.groupName;

    setLoadingMessage(`We're just creating your household for you...`);
    addFamily(userId, groupName).then(() => {
      reset();
      setFamilyStatus(true);
    });
  };

  return (
    <View>
      <Text>{`Hi ${firstName}, it looks like you're not part of a group yet, let's fix that now. You can create a new group by entering a group name, or if you have an invite code from another group, you can join them by clicking the link below.`}</Text>
      <Controller
        defaultValue=""
        control={control}
        rules={{
          required: {
            value: true,
            message: "Please enter a new group name.",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <FormTextField
            error={errors.groupName}
            errorText={errors.groupName?.message}
            placeholder="Group Name"
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="groupName"
      />
      <Button title="Create New Group" onPress={handleSubmit(onSubmit)} />
      <Text>{loadingMessage}</Text>
      <Button
        title="Join an Existing Group"
        onPress={() => {
          navigation.navigate("JoinGroup");
        }}
      />
    </View>
  );
};

export default CreateGroupScreen;
