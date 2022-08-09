import { View, Text, StyleSheet } from "react-native";
import React from "react";
import STRINGS from "../../assets/constants/strings";
import COLORS from "../../assets/constants/colors";

const Items = ({ data }) => {
  const correct = decodeURIComponent(data.correct);
  const incorrect = decodeURIComponent(data.chosen);
  const score = decodeURIComponent(data.score);
  const question = decodeURIComponent(data.question);
  return (
    <View style={styles.bg}>
      <View style={styles.row}>
        <Text style={styles.top}>{STRINGS.QUESTION + data.qno}</Text>
        <Text style={styles.top}>{score}</Text>
      </View>
      <Text style={styles.title}>{question}</Text>
      <Text style={styles.correct}>{correct}</Text>
      {score == 0 && incorrect != "" && (
        <Text style={styles.incorrect}>{incorrect}</Text>
      )}
      {incorrect == "" && <Text style={styles.notAns}>{STRINGS.NOT_ANS}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  notAns: {
    fontSize: 20,
    color: COLORS.WHITE,
    margin: 10,
  },
  top: {
    color: COLORS.WHITE,
    fontSize: 20,
    borderRadius: 10,
    margin: 10,
    padding: 5,
  },
  bg: {
    backgroundColor: COLORS.BLUE_BUTTON,
    margin: 10,
    padding: 10,
    borderColor: COLORS.LIGHT_GREEN,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  incorrect: {
    color: COLORS.WHITE,
    fontSize: 20,
    backgroundColor: COLORS.RED,
    borderRadius: 10,
    margin: 10,
    padding: 5,
  },
  correct: {
    color: COLORS.WHITE,
    fontSize: 20,
    backgroundColor: COLORS.GREEN,
    borderRadius: 10,
    margin: 10,
    padding: 5,
  },
  title: {
    color: "white",
    fontSize: 20,
    borderRadius: 10,
    margin: 10,
    padding: 5,
  },
});
export default Items;
