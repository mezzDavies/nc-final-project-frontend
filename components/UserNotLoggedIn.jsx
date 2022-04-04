import React from "react";
import { Button, View, Text, StyleSheet, ScrollView } from "react-native";
import SignUpPage from "./auth-components/SignUpPage";
import SignInPage from "./auth-components/SignInPage";

const styles = StyleSheet.create({
  titleText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#DD1F13",
    padding: 10,
  },
  optionContainer: {
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 3,
    borderColor: "#DD1F13",
    borderRadius: 5,
    padding: 30,
  },
});

const UserNotLoggedIn = ({ setUserStatus }) => {
  return (
    <ScrollView>
      <View
        style={{
          marginLeft: 35,
          marginRight: 35,
          marginTop: 30,
          fontWeight: "700",
          color: "#DD1F13",
        }}
      >
        <Text
          style={{
            marginLeft: 25,
            marginRight: 25,
            fontWeight: "700",
            color: "#DD1F13",
          }}
        >{`It looks like you're not logged in at the moment, so you're unable to access this page. If you already have an account you can sign in, or if not you can sign up below:`}</Text>
        <View style={styles.optionContainer}>
          <Text style={styles.titleText}>Sign In</Text>
          <SignInPage setUserStatus={setUserStatus} />
        </View>
        <View style={styles.optionContainer}>
          <Text style={styles.titleText}>Register a New Account</Text>
          <SignUpPage setUserStatus={setUserStatus} />
        </View>
      </View>
    </ScrollView>
  );
};

export default UserNotLoggedIn;
