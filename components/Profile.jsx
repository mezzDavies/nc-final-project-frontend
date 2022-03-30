import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { auth } from "../firebase";
import UserNotLoggedIn from "./UserNotLoggedIn";
import getUserDataAndClaims from "../utils/getUserDataAndClaims";

const ProfileScreen = ({ navigation }) => {
  const [userStatus, setUserStatus] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [familyStatus, setFamilyStatus] = useState(false);

  const signUserOut = () => {
    auth.signOut()
      .then(() => {
        setUserStatus(false);
      })
  }

  useEffect(() => {
    if(auth.currentUser) {
      setUserStatus(true);
      getUserDataAndClaims()
        .then(({ claims, userData, userId }) => {
          setFirstName(userData.name);
          userData.groupIds?.length > 0 ? setFamilyStatus(true) : setFamilyStatus(false);
        })
    } else {
      setUserStatus(false);
      setFirstName('');
    }
  }, [userStatus])

  if(!userStatus) {
    return <UserNotLoggedIn setUserStatus={setUserStatus} />
  } else {
    return (
      <View>
        <Text style={{ textAlign: "center", marginTop: 70, marginBottom: 40, fontSize: 20 }}>
          Hi {firstName} and welcome to Planet Scran It!
        </Text>
        {familyStatus === true ? 
          <Text style={{textAlign: "center", fontSize: 20}}>
            Great news, you're already part of a group, head to your household to see who else has joined you!
          </Text> : 
          <Text style={{textAlign: "center", fontSize: 20}}>
            It looks like you're not part of a group just yet, head to your household page and you can create a new group, or you could join a friends!
          </Text>
        }
        <View style={{marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10}}>
        <Button title="My Household" onPress={() => navigation.navigate("Household")} />
        </View>
        <View style={{marginLeft: 10, marginRight: 10}}>
        <Button title="Log Out" onPress={signUserOut} />
        </View>
      </View>
    );
  }
};

export default ProfileScreen;
