import React from "react";
import { StyleSheet, View } from "react-native";

import LottieView from "lottie-react-native";
import LINKS from "../../assets/constants/links";

export default function LoadingAnimation() {
  return (
    <View>
      <LottieView
        source={LINKS.LOADING}
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
    height: 800,
  },
});