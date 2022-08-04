import React from "react";
import { StyleSheet, View } from "react-native";

import LottieView from "lottie-react-native";

export default function LoadingAnimation() {
  return (
    <View>
      <LottieView
        source={require("../../assets/loading.json")}
        autoPlay={true}
        style={styles.animation}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  animation: {
    position:'absolute',
    alignSelf:'center',
    alignContent:'center',
    alignItems:'center',
    width: 370,
    // backgroundColor:'#fff',
    height: 800,
  },
});