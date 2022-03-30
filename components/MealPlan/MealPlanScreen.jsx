import React from "react";
import { View, ScrollView } from "react-native";
import MealPlanList from "./components/MealPlanList";

const MealPlanScreen = ({ navigation }) => {
  const [userStatus, setUserStatus] = useState(false);
  const [familyStatus, setFamilyStatus] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    auth.onAuthStateChanged(function (user) {
      if(user) {
        setUserStatus(true);
        getUserDataAndClaims()
        .then(({ claims, userData, newUserId }) => {
          if(!userData.groupIds?.length > 0) {
            setFamilyStatus(false)
            return Promise.reject({ status: 400, message: "Not a member of any group"})
          } else {
            setFamilyStatus(true)
          }
        })
        .catch((err) => {
          return err
        })
      } else {
        setUserStatus(false);
        setFamilyStatus(false);
      }
    })
  }, [userStatus, familyStatus]);

  if (!userStatus) return <UserNotLoggedIn setUserStatus={setUserStatus} />
  if (!familyStatus) return <Text>It looks like you're not part of a group yet, take a look at the household page under your account.</Text>

  return (
    <ScrollView>
      <View>
        <MealPlanList navigation={navigation} />
      </View>
    </ScrollView>
  );
};

export default MealPlanScreen;
