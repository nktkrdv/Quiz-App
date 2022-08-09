import React from "react";
import { StyleSheet, View } from "react-native";

import LottieView from "lottie-react-native";
import LINKS from "../../assets/constants/links";

export default function SimpleAnimation() {
  return (
    <View>
      <LottieView
        source={LINKS.CONGRATS_ANIMATION}
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