//IMPORTS - react
import React, { useState, useEffect } from "react";
import { Button, Text, View } from "react-native";

//IMPORTS - firebase
import { removeUserFromFamily } from "../../api/firestoreFunctions.families";

//----------COMPONENT----------
const LeavingGroupModal = ({ userId, familyId, setFamilyId, setLeavingModalVisible, setFamilyStatus }) => {
    //-----Declarations-----
    const [loadingMessage, setLoadingMessage] = useState('')
    
    const leaveFamilyConfirm = () => {
        setLoadingMessage("Removing you from the group now...");
        removeUserFromFamily(userId, familyId)
        .then(() => {
            setFamilyId('');
            setFamilyStatus(false);
            setLoadingMessage('');
            setLeavingModalVisible(false);
        });
    }

    //-----Rendering-----
    return (
        <View>
            <Text style={{textAlign: "center"}}>Are you sure you wish to leave the group?</Text>
            <Text style={{textAlign: "center"}}>If you do so, your voting short list will be permanently lost.</Text>
            <Button title="Confirm" onPress={leaveFamilyConfirm} />
            <Text>{loadingMessage}</Text>
        </View>
    )
};

//EXPORTS
export default LeavingGroupModal;