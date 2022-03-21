import React, { useEffect, useCallback, useState } from 'react';
import { Button, TextInput, View } from 'react-native-web';
import { auth } from "../firebase";

const SignInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.value);
    };

    const handleChange = (event) => {

    }

    return (
        <View>
            <TextInput placeholder="Email" />
            <TextInput secureTextEntry={true} placeholder="Password" />
            <Button title="Submit" onPress={onSubmit} />
        </View>
    )
};

export default SignInPage;