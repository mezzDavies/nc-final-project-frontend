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

// ----------COMPONENT----------
const SignUpPage = ({ navigation }) => {
  //-----Declarations-----
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const [loadingMessage, setLoadingMessage] = useState('')

  const onSubmit = (data) => {
    const firstName = data.firstName;
    const email = data.email;
    const password = data.password;

    setLoadingMessage(`We're just creating your account for you now...`)
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        const createDoc =  setDoc(doc(fireDB, "users", cred.user.uid), {
          name: firstName,
          isParent: true
        });
        return Promise.all([cred, createDoc])
      })
      .then(([cred, docResult]) => {
        const addParentClaim = httpsCallable(fireFunctions, "addParentClaim");
        return addParentClaim({ email: cred.user.email });
      })
      .then(() => {
        return auth.currentUser.getIdToken(true);
      })
      .then(() => {
        reset();
        navigation.navigate("Profile");
      })
      .catch((err) => {
        return err
      })
  };

  //-----Rendering-----
  return (
    <View>
      <Text>
        Hi! Welcome to Planet Scran It, please enter your details below to sign
        up and enter a whole new world of food!
      </Text>
      <Text>
        Once you're registered, it may take a second to load but you will then be taken to the Sign In page to confirm your login details.
      </Text>
      <Controller
        defaultValue=""
        control={control}
        rules={{
          required: {
            value: true,
            message: "Please enter your first name.",
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
      <Controller
        defaultValue=""
        control={control}
        rules={{
          required: {
            value: true,
            message: "Please enter your email address.",
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
            message: "Please enter a password.",
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

//EXPORTS
export default SignUpPage;
