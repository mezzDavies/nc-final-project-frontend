//IMPORTS - react
import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";

//IMPORTS - firebase
import { auth, fireDB } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

//IMPORTS - utils functions
import userNotLoggedIn from "../../utils/userNotLoggedIn";

//----------COMPONENT----------
const HouseHoldScreen = ({ navigation }) => {
  //-----Declarations-----
  const [userId, setUserId] = useState('');
  const [userStatus, setUserStatus] = useState(false);
  const [familyId, setFamilyId] = useState('');
  const [firstName, setFirstName] = useState('');

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
            setFirstName(userData.name);
            if(userData.groupIds?.length > 0) {
              setFamilyId(userData.groupIds[0]);
            } else {
              setFamilyId('');
              navigation.navigate("CreateGroup");
            }
          }
        })
      } else {
        setUserStatus(false);
        setUserId('');
        setFamilyId('');
        setFirstName('');
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
      </View>
    );
  }
};

//EXPORTS
export default HouseHoldScreen;
