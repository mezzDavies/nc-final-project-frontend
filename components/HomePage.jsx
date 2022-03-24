import React, { useState, useEffect } from "react";
import { Button, View, Text } from "react-native";
import { auth } from "../firebase";
import { fireDB } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Homepage = ({ navigation }) => {
  const [userStatus, setUserStatus] = useState(false);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged(function(user) {
      if(user) {
        setUserStatus(true);
        auth.currentUser.getIdTokenResult()
        .then(({ claims }) => {
          const userDocRef = doc(fireDB, 'users', claims.user_id);
          return getDoc(userDocRef)
        })
        .then((docSnap) => {
          if(docSnap.exists()) {
            const userData = docSnap.data();
            setFirstName(userData.name);
          }
        })
      } else {
        setUserStatus(false);
        setFirstName('');
      }
    })
  }, [userStatus])

  if(userStatus) {
    return (
      <View>
        <Text style={{ textAlign: "center", marginTop: 300 }}>Hello {firstName}, welcome back!</Text>
        <Button
          title="Go to recipe..."
          onPress={() => navigation.navigate("RecipePage")}
        />
        <Button
          title="Go to profile..."
          onPress={() => navigation.navigate("Account", { screen: "Profile" })}
        />
        <Button
          title="Go to search page in..."
          onPress={() => navigation.navigate("SearchPage")}
        />
      </View>
    );
  } else {
    return (
      <>
        <View>
          <Text style={{ textAlign: "center", marginTop: 300 }}>Home Screen</Text>
          <Button
            title="Go to recipes..."
            onPress={() => navigation.navigate("RecipePage")}
          />
          <Button
            title="Go to sign up..."
            onPress={() => navigation.navigate("Account", { screen: "SignUp" })}
          />
          <Button
            title="Go to sign in..."
            onPress={() => navigation.navigate("Account", { screen: "SignIn" })}
          />
          <Button
            title="Go to search page in..."
            onPress={() => navigation.navigate("SearchPage")}
          />
        </View>
      </>
    );
  }
};

export default Homepage;
