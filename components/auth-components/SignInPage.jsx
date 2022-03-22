import React from 'react';
import { Button, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { FormTextField } from '../FormTextField';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";


const SignInPage = () => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;

        signInWithEmailAndPassword(auth, email, password).then((cred) => { })
            .then(() => {
                reset();
            })
    };

    return (
        <View>
            <Controller
                defaultValue=""
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: 'Email is required.'
                    }
                }}
                render={({ field: { onChange, value } }) => (
                    <FormTextField 
                        error={errors.email}
                        errorText={errors.email?.message}
                        placeholder="Email"
                        onChangeText={(value) => onChange(value)}
                        value={value}
                    />
                )}
                name="email"
            />
            <Controller
                defaultValue=""
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: 'Password is required.'
                    }
                }}
                render={({ field: { onChange, value } }) => (
                    <FormTextField
                        error={errors.password}
                        errorText={errors.password?.message}
                        secureTextEntry={true}
                        placeholder="Password"
                        onChangeText={(value) => onChange(value)}
                        value={value}
                    />
                )}
                name="password"
            />
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
    )
};

export default SignInPage;