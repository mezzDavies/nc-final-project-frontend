import React, { useState, useEffect } from "react";
import { Button, View, Text, ScrollView } from "react-native";
import { auth } from "../firebase";
import RandomRecipes from "./RandomRecipes";
import getUserDataAndClaims from "../utils/getUserDataAndClaims";

const Homepage = ({ navigation }) => {
  const [userStatus, setUserStatus] = useState(false);
  const [firstName, setFirstName] = useState('');

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
            title="View all Recipes..."
            onPress={() => navigation.navigate("RecipesAll")}
          />
          <RandomRecipes navigation={navigation} />
          <Button
            title="Go to Testing..."
            onPress={() => navigation.navigate("Testing")}
          />
          <Button
            title="Go to profile..."
            onPress={() =>
              navigation.navigate("Account", { screen: "Profile" })
            }
          />
          <Button
            title="Go to search page in..."
            onPress={() => navigation.navigate("SearchPage")}
          />
        </View>
      </ScrollView>
    );
  } else {
    return (
      <>
        <ScrollView>
          <View>
            <RandomRecipes navigation={navigation} />
            <Text style={{ textAlign: "center", marginTop: 300 }}>
              Home Screen
            </Text>
            <Button
              title="Go to recipes..."
              onPress={() => navigation.navigate("RecipePage")}
            />
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
            <Button
              title="Go to search page in..."
              onPress={() => navigation.navigate("SearchPage")}
            />
          </View>
        </ScrollView>
      </>
    );
  }
};

export default Homepage;
