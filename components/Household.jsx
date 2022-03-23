//IMPORTS - react
import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { FormTextField } from "./FormTextField";

//IMPORTS - firebase
import { auth, fireDB } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

//IMPORTS - utils functions
import userNotLoggedIn from "../utils/userNotLoggedIn";
import { addFamily } from "../api/firestoreFunctions";

//----------COMPONENT----------
const HouseHoldScreen = ({ navigation }) => {
  //-----Declarations-----
  const [userId, setUserId] = useState('');
  const [userStatus, setUserStatus] = useState(false);
  const [familyId, setFamilyId] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const { control, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const groupName = data.groupName;

    setLoadingMessage(`We're just creating your household for you...`)
    addFamily(userId, groupName)
      .then((familyDocRef) => {
        setFamilyId(familyDocRef);
      })
      .then(() => {
        reset();
      })
  }
  //-----Use Effects-----
  useEffect(() => {
    auth.onAuthStateChanged(function(user) {
      if(user) {
        setUserStatus(true);
        auth.currentUser.getIdTokenResult()
        .then(({ claims }) => {
          const userDocRef = doc(fireDB, 'users', claims.user_id);
          if(claims.parent) {
            setUserId(claims.user_id)
            return getDoc(userDocRef)
          }
        })
        .then((docSnap) => {
          if(docSnap.exists()) {
            const userData = docSnap.data();
          }
        })
      } else {
        setUserStatus(false);
        setUserId('');
      }
    })
  }, [userStatus])

  //------Rendering------
  if(!userStatus) {
    return userNotLoggedIn(navigation)
  } else {
    return (
      <View>
        <Controller
          defaultValue=""
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter a group name.",
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
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        <Text>{loadingMessage}</Text>
      </View>
    );
  }
};

//EXPORTS
export default HouseHoldScreen;
