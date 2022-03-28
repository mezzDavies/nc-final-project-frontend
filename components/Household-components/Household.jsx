//IMPORTS - react
import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView } from "react-native";

//IMPORTS - firebase
import { auth, fireFunctions } from "../../firebase";

//IMPORTS - utils functions and components
import FamilyMemberCard from "./FamilyMemberCard";
import getUserDataAndClaims from "../../utils/getUserDataAndClaims";
import { getFamily } from "../../api/firestoreFunctions.families";
import { httpsCallable } from "firebase/functions";
import UserNotLoggedIn from "../UserNotLoggedIn";
import CreateGroupScreen from "./CreateGroupScreen";

//----------COMPONENT----------
const HouseHoldScreen = ({ navigation }) => {
  //-----Declarations-----
  const [userId, setUserId] = useState("");
  const [userStatus, setUserStatus] = useState(false);
  const [parentStatus, setParentStatus] = useState(false);
  const [familyId, setFamilyId] = useState("");
  const [familyMembers, setFamilyMembers] = useState([]);
  const [familyName, setFamilyName] = useState("");
  const [familyStatus, setFamilyStatus] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");

  const switchToUserParentAccount = () => {
    setLoadingMessage(`We're just loading the parent account again...`);
    const switchtoParentAccount = httpsCallable(
      fireFunctions,
      "switchToParentAccount"
    );
    switchtoParentAccount()
      .then(() => {
        return auth.currentUser.getIdToken(true);
      })
      .then(() => {
        return auth.currentUser.getIdTokenResult();
      })
      .then(({ claims }) => {
        setUserId(claims.user_id);
        setLoadingMessage("");
      });
  };

  //-----Use Effects-----
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setUserStatus(true);
        getUserDataAndClaims().then(({ claims, userData, newUserId }) => {
          setFirstName(userData.name);
          setParentStatus(claims.parent);
          if (userData.groupIds?.length > 0) {
            setFamilyId(userData.groupIds[0]);
            setFamilyStatus(true);
          } else {
            setFamilyId("");
            setFamilyStatus(false);
          }
        });
      } else {
        setUserStatus(false);
        setFamilyId("");
        setFirstName("");
        setFamilyMembers([]);
      }
    });
  }, [userId, familyStatus]);

  useEffect(() => {
    if (familyId) {
      getFamily(familyId).then(({ family }) => {
        setFamilyName(family.groupName);
        setFamilyMembers(family.familyMembers);
      });
    }
  }, [familyId, familyStatus]);

  //------Rendering------
  if (!userStatus) {
    return <UserNotLoggedIn setUserStatus={setUserStatus} />;
  } else if (!familyStatus) {
    return (
      <CreateGroupScreen
        setFamilyStatus={setFamilyStatus}
        navigation={navigation}
      />
    );
  } else {
    return (
      <ScrollView>
        <View>
          <Text>{loadingMessage}</Text>
          <Text>
            Hello {firstName}, and welcome to the {familyName} group!
          </Text>
          {!parentStatus ? (
            <Button
              title="Switch back to parent account"
              onPress={switchToUserParentAccount}
              color="#859cc7"
            />
          ) : (
            <Text>
              Want to invite others to join the group? Your invite code is:{" "}
              {familyId}
            </Text>
          )}
          <Text>Group Members:</Text>
          {familyMembers.map((familyMember, index) => {
            return (
              <FamilyMemberCard
                familyMember={familyMember}
                setLoadingMessage={setLoadingMessage}
                loadingMessage={loadingMessage}
                key={`${familyId} - ${index}`}
                setUserId={setUserId}
                parentStatus={parentStatus}
              />
            );
          })}
          {parentStatus ? (
            <Button
              title="Add a child to the account"
              onPress={() => navigation.navigate("AddChildren")}
            />
          ) : null}
        </View>
      </ScrollView>
    );
  }
};

//EXPORTS
export default HouseHoldScreen;
