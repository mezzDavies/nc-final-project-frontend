//IMPORTS - react
import React, { useState, useEffect } from "react";
import { Button, Text, View } from "react-native";
import { useForm, Controller } from "react-hook-form";

//IMPORTS - utils functions
import { FormTextField } from "../Reusables/FormTextField";
import { createChildAccount } from "../../api/firestoreFunctions.users";

//----------COMPONENT----------
const AddChildrenScreen = ({ setFamilyMembers, setModalVisible, familyId }) => {
    //-----Declarations-----
    const { control, handleSubmit, reset, formState: { errors } } = useForm();
    const [loadingMessage, setLoadingMessage] = useState('')
        
    const onSubmit = (data) => {
        const firstName = data.firstName;

        setLoadingMessage(`We're just creating your child's account for you now...`)
        createChildAccount(familyId, firstName)
            .then((childRef) => {
                reset();
                setFamilyMembers((currFamilyMembers) => {
                    const newFamilyMembers = [...currFamilyMembers, childRef]
                    return newFamilyMembers;
                })
                setModalVisible(false);
            })
            .catch((err) => {
                return err
            })
    };

    //-----Rendering-----
    return (
        <View>
            <Text>What is your child's first name?</Text>
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
            <Text>{loadingMessage}</Text>
        </View>
    )
};

//EXPORTS
export default AddChildrenScreen;