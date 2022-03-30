//IMPORTS - react
import React, { useState, useEffect } from "react";
import { View, Button, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { FormTextField } from "../Reusables/FormTextField";

//IMPORTS - firebase
import { auth, fireDB } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

//IMPORTS - utils functions
import getUserDataAndClaims from "../../utils/getUserDataAndClaims";
import { addUserToFamily } from "../../api/firestoreFunctions.families";

//----------COMPONENT----------
const JoinGroupScreen = ({ userId, firstName, setFamilyStatus, setModalVisible }) => {
  //-----Declarations-----
  const [loadingMessage, setLoadingMessage] = useState("");
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const inviteCode = data.inviteCode;

    setLoadingMessage(`We're just loading up the group now...`);
    addUserToFamily(userId, inviteCode).then(() => {
      reset();
      setFamilyStatus(true);
      setModalVisible(false);
    });
  };

  //-----Rendering-----
  return (
    <View>
      <Text>
        Hi {firstName}, it looks like you're trying to join an existing group,
        to do this you'll need an invite code for that group. If you don't have
        one, ask a member of the group to send you one and you can join
        immediately!
      </Text>
      <Controller
        defaultValue=""
        control={control}
        rules={{
          required: {
            value: true,
            message: "Please enter your invite code above.",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <FormTextField
            error={errors.inviteCode}
            errorText={errors.inviteCode?.message}
            placeholder="Invite Code"
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="inviteCode"
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      <Text>{loadingMessage}</Text>
    </View>
  );
};

//-----EXPORTS-----
export default JoinGroupScreen;
