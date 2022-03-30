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
          <Button
            title="View all recipes..."
            onPress={() => navigation.navigate("RecipesAll")}
          />
          <RandomRecipes navigation={navigation} />
        </View>
      </ScrollView>
    );
  } else {
    return (
      <>
        <ScrollView>
          <View>
            <Text style={{ textAlign: "center", marginTop: 300 }}>
              Hi, it looks like you're not logged in yet. You can see the starter of Planet Scran It below, but to access the main course, you'll need to log in or sign up.
            </Text>
            <RandomRecipes navigation={navigation} />
            <Button
              title="Go to sign up..."
              onPress={() =>
                navigation.navigate("Account", { screen: "SignUp" })
              }
            />
            <Button
              title="Go to sign in..."
              onPress={() =>
                navigation.navigate("Account", { screen: "SignIn" })
              }
            />
          </View>
        </ScrollView>
      </>
    );
  }
};

export default Homepage;
