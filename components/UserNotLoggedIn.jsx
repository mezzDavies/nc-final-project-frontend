import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import SignUpPage from "./auth-components/SignUpPage";
import SignInPage from "./auth-components/SignInPage";

const styles = StyleSheet.create({
    titleText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        textDecorationLine: "underline",
        marginBottom: 5
    },
    optionContainer: {
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 3,
        borderColor: "#031a40",
        borderRadius: 5
    }
})

const UserNotLoggedIn = ({ setUserStatus }) => {
    return (
        <View>
            <Text style={{marginLeft: 5, marginRight: 5}}>{ `It looks like you're not logged in at the moment, so you're unable to access this page. If you already have an account you can sign in, or if not you can sign up below:` }</Text>
            <View style={styles.optionContainer}>
                <Text style={styles.titleText}>Sign In</Text>
                <SignInPage setUserStatus={setUserStatus} />
            </View>
            <View style={styles.optionContainer}>
                <Text style={styles.titleText}>Register a New Account</Text>
                <SignUpPage setUserStatus={setUserStatus} />
            </View>
        </View>
    )
};

export default UserNotLoggedIn;