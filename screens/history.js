import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "@react-native-firebase/auth";
import { firestore } from "../Setup";
import { TouchableOpacity } from "react-native-gesture-handler";
import ItemHistory from "./components/items";
import LoadingAnimation from "./components/loadingAnime";
import NAV from "../assets/constants/navigation";
import STRINGS from "../assets/constants/strings";
import COLORS from "../assets/constants/colors";

const History = ({ navigation }) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [questionList, setQuestionList] = useState([]); // Initial empty array of users
  const usr = firebase.auth().currentUser;
  const [score, setScore] = useState(0);
  const [length, setLength] = useState(1);

  useEffect(() => {
    const subscriber = firestore()
      .collection("Users")
      .doc(usr.uid)
      .collection("History")
      .orderBy("doneAt", "desc")
      .onSnapshot((querySnapshot) => {
        const answerList = [];
        var value = 0;
        var len = 0;
        querySnapshot.forEach((documentSnapshot) => {
          value += documentSnapshot.data().score;
          len++;
          answerList.push({
            ...documentSnapshot.data(),
            key: len,
          });
        });
        setScore(value);
        setLength(len);
        setQuestionList(answerList);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  const ShowDetails = (key, score) => {
    navigation.navigate(NAV.RESPONSES, { map: key, score: score });
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <View>
      <View>
        <Text style={styles.header}>
          {STRINGS.AVERAGE + (score / length).toFixed(2)}
        </Text>
      </View>
      <FlatList
        style={{ height: "90%" }}
        data={questionList}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => ShowDetails(item.map, item.score)}>
            <ItemHistory data={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: STRINGS.BOLD,
    color: COLORS.WHITE,
    backgroundColor: COLORS.BLUE_BUTTON,
    borderRadius: 20,
    margin: 10,
    padding: 5,
    borderColor: COLORS.LIGHT_GREEN,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    textAlign: "center",
  },
  col: {
    margin: 10,
    padding: 5,
  },
  item: {
    fontSize: 20,
    color: COLORS.WHITE,
    alignSelf: "center",
    backgroundColor: COLORS.DARK_BLUE,
    margin: 10,
    width: "100%",
    padding: 10,
    textAlign: "center",
    borderRadius: 20,
    alignContent: "center",
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: COLORS.LIGHT_GREEN,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.GREEN,
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  text: {
    color: "white",
    fontSize: 15,
    borderRadius: 10,
  },
  blueBG: {
    backgroundColor: COLORS.OCEAN_BLUE,
    borderColor: COLORS.DARK_BLUE,
  },
  darkBlueBG: {
    backgroundColor: COLORS.DARK_BLUE,
    borderColor: COLORS.OCEAN_BLUE,
  },
});
