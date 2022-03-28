import React from "react";
import { Button, View, Text } from "react-native";
import SignUpPage from "./auth-components/SignUpPage";
import SignInPage from "./auth-components/SignInPage";

const UserNotLoggedIn = ({ setUserStatus }) => {
    return (
        <View>
            <Text>{ `It looks like you're not logged in at the moment, so you're unable to access this page. If you already have an account you can sign in, or if not you can sign up below:` }</Text>
            <SignInPage setUserStatus={setUserStatus} />
            <SignUpPage setUserStatus={setUserStatus} />
        </View>
    )
};

export default UserNotLoggedIn;