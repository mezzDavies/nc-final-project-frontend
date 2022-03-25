//IMPORTS - react
import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";

//IMPORTS - firebase
import { auth, fireDB } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

//IMPORTS - utils functions
import userNotLoggedIn from "../../utils/userNotLoggedIn";
import getUserDataAndClaims from "../../utils/getUserDataAndClaims";

//----------COMPONENT----------
const HouseHoldScreen = ({ navigation }) => {
  //-----Declarations-----
  const [userId, setUserId] = useState('');
  const [userStatus, setUserStatus] = useState(false);
  const [familyId, setFamilyId] = useState('');
  const [familyMembers, setFamilyMembers] = useState([]);
  const [firstName, setFirstName] = useState('');

  //-----Use Effects-----
  useEffect(() => {
    auth.onAuthStateChanged(function(user) {
      if(user) {
        setUserStatus(true);
        getUserDataAndClaims()
          .then(({ claims, userData }) => {
            setFirstName(userData.name);
            setUserId(claims.user_id);
            if(userData.groupIds?.length > 0) {
              setFamilyId(userData.groupIds[0]);
            } else {
              setFamilyId('');
              navigation.navigate("CreateGroup");
            }
          })
      } else {
        setUserStatus(false);
        setUserId('');
        setFamilyId('');
        setFirstName('');
        setFamilyMembers([]);
      }
    })
  }, [userStatus, familyId])

  //------Rendering------
  if(!userStatus) {
    return userNotLoggedIn(navigation);
  } else {
    return (
      <View>
        <Text>You in a family, well done</Text>
        <Button title="Add a child to the account" />
      </View>
    );
  }
};

//EXPORTS
export default HouseHoldScreen;
