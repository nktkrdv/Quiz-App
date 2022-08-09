import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image } from "react-native";

const SignInModal = ({message,icon,setVis}) => {
  const [modalVisible, setModalVisible] = useState(true);
  React.useEffect(() => {
    setModalVisible(true);
  }, []);
  return (
        <BlurView tint="dark" intensity={115} style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={{uri:icon}} style={styles.icon}/>
            <Text style={styles.modalText}>{message}</Text>
            <View style={[styles.button,styles.buttonClose]}>
              <Text style={styles.textStyle}>Okay</Text>
            </View>
          </View>
        </BlurView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    height:800,
    width:450,
    alignSelf:'center',
    alignContent:'center',
    justifyContent: "center",
    alignItems: "center",
    position:'absolute'
  },
  icon:{
    height:60,
    width:60,
    margin:20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
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
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default SignInModal;