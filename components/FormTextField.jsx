import React from 'react';
import { View, Text, TextInput } from 'react-native';

export const FormTextField = (props) => {
    return (
        <View>
            <TextInput {...props} />
            {props.errorText ? <Text>{props.errorText}</Text> : null }
        </View> 
    );
}