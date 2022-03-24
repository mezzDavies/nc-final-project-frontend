import React from "react";
import { Button, View, Text } from "react-native";

const userNotLoggedIn = (navigation) => {
    return (
        <View>
            <Text>{ `It looks like you're not logged in at the moment, so you're unable to access this page. If you already have an account you can sign in, or if not you can sign up below:` }</Text>
            <Button
                title="Go to sign up..."
                onPress={() => navigation.navigate("Account", { screen: "SignUp" })}
            />
            <Button
                title="Go to sign in..."
                onPress={() => navigation.navigate("Account", { screen: "SignIn" })}
            />
        </View>
    )
};

export default userNotLoggedIn;