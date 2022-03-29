import React, { useState, useEffect } from "react";
import { Button, View, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { FormTextField } from "../Reusables/FormTextField";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignInPage = ({ setUserStatus }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loadingMessage, setLoadingMessage] = useState('');

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    setLoadingMessage(`We're just logging you in...`)
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        reset();
        setUserStatus(true)
      });
  };

  useEffect(() => {
    auth.onAuthStateChanged(function(user) {
      if(user) {
        setUserStatus(true);
      }
    })
  }, []);

  return (
    <View>
      <Controller
        defaultValue=""
        control={control}
        rules={{
          required: {
            value: true,
            message: "Email is required.",
          },
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
            message: "Password is required.",
          },
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
      <Text>{loadingMessage}</Text>
    </View>
  );
};

export default SignInPage;
