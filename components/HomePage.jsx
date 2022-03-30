import React, { useState, useEffect } from "react";
import { Button, View, Text, ScrollView } from "react-native";
import { auth } from "../firebase";
import RandomRecipes from "./RandomRecipes";
import RecipesList from "./Recipes/components/RecipesList";
import getUserDataAndClaims from "../utils/getUserDataAndClaims";

const Homepage = ({ navigation }) => {
  const [userStatus, setUserStatus] = useState(false);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setUserStatus(true);
        getUserDataAndClaims().then(({ claims, userData, newUserId }) => {
          console.log(claims);
          setFirstName(userData.name);
        });
      } else {
        setUserStatus(false);
      }
    });
  }, []);

  if (userStatus) {
    return (
      <ScrollView>
        <View>
          <RandomRecipes navigation={navigation} />
          <RecipesList navigation={navigation} />
        </View>
      </ScrollView>
    );
  } else {
    return (
      <>
        <ScrollView>
          <View>
            <RandomRecipes navigation={navigation} />
            <RecipesList navigation={navigation} />
          </View>
        </ScrollView>
      </>
    );
  }
};

export default Homepage;
