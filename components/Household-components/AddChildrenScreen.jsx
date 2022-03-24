//IMPORTS - react
import React, {useState} from "react";
import { Button, Text, View } from "react-native";
import { useForm, Controller } from "react-hook-form";

//IMPORTS - firebase
import { auth, fireDB } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { fireFunctions } from "../../firebase";
import { httpsCallable } from "firebase/functions";
import { doc, setDoc } from "firebase/firestore";

//IMPORTS - utils functions
import { FormTextField } from "../FormTextField";
import { createChildAccount } from "../../api/createChildAccount";
import { useEffect } from "react/cjs/react.production.min";

//----------COMPONENT----------
const AddChildrenScreen = ({ navigation, route }) => {
    //-----Declarations-----
    const { control, handleSubmit, reset, formState: { errors } } = useForm();
    const [loadingMessage, setLoadingMessage] = useState('')
    const [familyId, setFamilyId] = useState('');

    console.log(route)

    // useEffect(() => {
    //     return setFamilyId(route.params.familyId);
    // }, [])
    
    const onSubmit = (data) => {
        const firstName = data.firstName;

        setLoadingMessage(`We're just creating your child's account for you now...`)
        createChildAccount(familyId, firstName)
            .then(() => {
                reset();
                navigation.navigate("Household");
            })
            .catch((err) => {
                return err
            })
    };

    //-----Rendering-----
    return (
        <View>
            <Controller
                defaultValue=""
                control={control}
                rules={{
                required: {
                    value: true,
                    message: "Please enter your child's first name.",
                },
                }}
                render={({ field: { onChange, value } }) => (
                <FormTextField
                    error={errors.firstName}
                    errorText={errors.firstName?.message}
                    placeholder="First Name"
                    onChangeText={(value) => onChange(value)}
                    value={value}
                />
                )}
                name="firstName"
            />
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
    )
};

//EXPORTS
export default AddChildrenScreen;