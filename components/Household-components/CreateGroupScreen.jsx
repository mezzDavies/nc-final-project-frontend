//IMPORTS - react
import React, { useState } from "react";
import { Button, View, Text, Modal, Pressable, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { FormTextField } from "../Reusables/FormTextField";

//IMPORTS - firebase
import { addFamily } from "../../api/firestoreFunctions.families";

//IMPORTS - components & utils
import JoinGroupScreen from "./JoinGroupScreen";

//STYLING - for modal
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#f0f0e4",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 15,
    padding: 5,
    elevation: 2,
    marginTop: 5
  },
  buttonOpen: {
    backgroundColor: "#384e9c",
  },
  buttonClose: {
    backgroundColor: "#384e9c",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  optionContainer: {
    marginTop: 20,
    marginBottom: 30,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 3,
    borderColor: "#031a40",
    borderRadius: 5
  }
});

//----------COMPONENT-----------
const CreateGroupScreen = ({ setFamilyStatus, userId, setUserId, firstName }) => {
  //------Declarations------
  const [loadingMessage, setLoadingMessage] = useState("");
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [modalVisible, setModalVisible] = useState(false);

  const onSubmit = (data) => {
    const groupName = data.groupName;

    setLoadingMessage(`We're just creating your household for you...`);
    addFamily(userId, groupName).then(() => {
      reset();
      setFamilyStatus(true);
    });
  };

  //-----Rendering------
  return (
    <View>
      <Text style={{ textAlign: "center", marginTop: 50, marginBottom: 20, marginLeft: 10, marginRight: 10, fontSize: 20 }}>{`Hi ${firstName}, it looks like you're not part of a group yet, let's fix that now. You can create a new group by entering a group name here...`}</Text>
      <View style={styles.optionContainer}>
        <Controller
          defaultValue=""
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter a new group name.",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <FormTextField
              error={errors.groupName}
              errorText={errors.groupName?.message}
              placeholder="Enter a Group Name Here"
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="groupName"
        />
        <View style={{marginTop: 10, marginBottom: 5, marginLeft: 10, marginRight: 10}}>
          <Button title="Create New Group" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
      <Text style={{ textAlign: "center", marginTop: 20, marginBottom: 10, marginLeft: 10, marginRight: 10, fontSize: 20 }}>{`Or if you have been given an invite code by a friend or family member, you can join their group instead...`}</Text>
      <Text>{loadingMessage}</Text>
      <View style={{marginTop: 10, marginBottom: 5, marginLeft: 10, marginRight: 10}}>
        <Button
          title="Join an Existing Group"
          onPress={() => {
            setModalVisible(true)
          }}
        />
      </View>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <JoinGroupScreen userId={userId} firstName={firstName} setFamilyStatus={setFamilyStatus} setModalVisible={setModalVisible} />
              <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(false)}>
                <Text style={styles.textStyle}>Close This Pop Up</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
    </View>
  );
};

//EXPORTS
export default CreateGroupScreen;
