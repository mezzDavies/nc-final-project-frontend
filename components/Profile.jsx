import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../firebase";
import userNotLoggedIn from "../utils/userNotLoggedIn";

const ProfileScreen = ({ navigation }) => {
  const [userStatus, setUserStatus] = useState(false);
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [familyStatus, setFamilyStatus] = useState(false);

  const signUserOut = () => {
    auth.signOut()
      .then(() => {
        setUserStatus(false);
      })
  }

  useEffect(() => {
    auth.onAuthStateChanged(function(user) {
      if(user) {
        setUserStatus(true);
        auth.currentUser.getIdTokenResult()
        .then(({ claims }) => {
          const userDocRef = doc(fireDB, 'users', claims.user_id);
          setUserId(claims.user_id);
          return getDoc(userDocRef)
        })
        .then((docSnap) => {
          if(docSnap.exists()) {
            const userData = docSnap.data();
            setFirstName(userData.name);
            userData.familyId ? setFamilyStatus(true) : setFamilyStatus(false);
          }
        })
      } else {
        setUserStatus(false);
        setFirstName('');
        setUserId('');
      }
    })
  }, [])

  if(!userStatus) {
    return userNotLoggedIn(navigation)
  } else {
    return (
      <View>
        <Text style={{ textAlign: "center", marginTop: 100 }}>
          Hi {firstName} and welcome to your profile!
        </Text>
        {familyStatus === true ? 
          <Text>
            You're part of a household, that must be nice!
          </Text> : 
          <Text>
            You're not part of a household yet, you can either start a new group or join an existing one from the household page.
          </Text>
        }
        <Button title="My Household" onPress={() => navigation.navigate("Household")} />
        <Button title="Log Out" onPress={signUserOut} />
      </View>
    );
  }
};

export default ProfileScreen;
