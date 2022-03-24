import React, { useState, useEffect } from "react";
import { View, Button, Text } from 'react-native';

import { useForm, Controller } from "react-hook-form";
import { FormTextField } from "../FormTextField";

import { auth, fireDB } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

import { addUserToFamily } from "../../api/firestoreFunctions";

const JoinGroupScreen = ({ navigation }) => {
    const [loadingMessage, setLoadingMessage] = useState('');
    const [userId, setUserId] = useState('');
    const [firstName, setFirstName] = useState('');  
    const { control, handleSubmit, reset, formState: { errors } } = useForm();  

    return (
        <View>
            <Text>This is the join group screen</Text>
        </View>
    )
}

export default JoinGroupScreen;