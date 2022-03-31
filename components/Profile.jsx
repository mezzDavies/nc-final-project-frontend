import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { auth } from "../firebase";
import UserNotLoggedIn from "./UserNotLoggedIn";
import getUserDataAndClaims from "../utils/getUserDataAndClaims";

const ProfileScreen = ({ navigation }) => {
  const [userStatus, setUserStatus] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [familyStatus, setFamilyStatus] = useState(false);

  const signUserOut = () => {
    auth.signOut().then(() => {
      setUserStatus(false);
    });
  };

  useEffect(() => {
    if (auth.currentUser) {
      setUserStatus(true);
      getUserDataAndClaims().then(({ claims, userData, userId }) => {
        setFirstName(userData.name);
        userData.groupIds?.length > 0
          ? setFamilyStatus(true)
          : setFamilyStatus(false);
      });
    } else {
      setUserStatus(false);
      setFirstName("");
    }
  }, [userStatus]);

  if (!userStatus) {
    return <UserNotLoggedIn setUserStatus={setUserStatus} />;
  } else {
    return (
      <View>
        <Text
          style={{
            textAlign: "center",
            marginTop: 60,
            marginBottom: 20,
            fontSize: 20,
          }}
        >
          Hello {firstName}, and welcome to Planet Scran It!
        </Text>
        {familyStatus === true ? (
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              marginBottom: 15,
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            Great news, you're already part of a group, click My Household to
            see who else has joined you!
          </Text>
        ) : (
          <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 15 }}>
            It looks like you're not part of a group just yet, head to your
            household page and you can create a new group, or you could join a
            friends!
          </Text>
        )}
        <View
          style={{
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <Button
            title="My Household"
            onPress={() => navigation.navigate("Household")}
            color="#DD1F13"
          />
        </View>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Button title="Log Out" onPress={signUserOut} color="#DD1F13" />
        </View>
      </View>
    );
  }
};

export default ProfileScreen;
