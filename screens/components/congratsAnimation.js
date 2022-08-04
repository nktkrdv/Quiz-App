import React from "react";
import { StyleSheet, View } from "react-native";

import LottieView from "lottie-react-native";

export default function SimpleAnimation() {
  return (
    <View>
      <LottieView
        source={require("../../assets/congratulation.json")}
        autoPlay={true}
        style={styles.animation}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  animation: {
    position:'absolute',
    width: 370,
    height: 600,
  },
});