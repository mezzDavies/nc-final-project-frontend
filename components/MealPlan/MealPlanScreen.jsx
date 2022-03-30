import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import MealPlanList from "./components/MealPlanList";
import UserNotLoggedIn from "../UserNotLoggedIn";
import { auth } from "../../firebase";
import getUserDataAndClaims from "../../utils/getUserDataAndClaims";

const MealPlanScreen = ({ navigation }) => {
  const [userStatus, setUserStatus] = useState(false);
  const [familyStatus, setFamilyStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setUserStatus(true);
        getUserDataAndClaims()
          .then(({ claims, userData, newUserId }) => {
            if (!userData.groupIds?.length > 0) {
              console.log("hello!");
              setFamilyStatus(false);
              return Promise.reject({
                status: 400,
                message: "Not a member of any group",
              });
            } else {
              setFamilyStatus(true);
            }
          })
          .catch((err) => {
            return err;
          });
      } else {
        setUserStatus(false);
        setFamilyStatus(false);
      }
    });
  }, [userStatus, familyStatus]);

  if (!userStatus) return <UserNotLoggedIn setUserStatus={setUserStatus} />;
  if (!familyStatus)
    return (
      <Text>
        It looks like you're not part of a group yet, take a look at the
        household page under your account.
      </Text>
    );

  return (
    <ScrollView>
      <View>
        <MealPlanList navigation={navigation} />
      </View>
    </ScrollView>
  );
};

export default MealPlanScreen;
