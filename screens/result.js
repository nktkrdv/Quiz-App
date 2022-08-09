import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { LogBox, ActivityIndicator } from "react-native";
import { firebase } from "@react-native-firebase/auth";
import { firestore } from "../Setup";
import { TouchableOpacity } from "react-native-gesture-handler";
import SimpleAnimatable from "./components/animation";
import SimpleAnimation from "./components/congratsAnimation";
import LINKS from "../assets/constants/links";
import COLORS from "../assets/constants/colors";
import STRINGS from "../assets/constants/strings";
import NAV from "../assets/constants/navigation";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const Result = ({ navigation }) => {
  const user = firebase.auth().currentUser;
  const [loading, setLoading] = React.useState(true);
  const route = useRoute();
  const [score, setScore] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [objectMap, setObjectMap] = React.useState([]);
  const getScore = () => {
    setLoading(true);
    let total = 0;
    let len = 0;
    for (const [key, value] of route.params.map.entries()) {
      let quesScore = value.get("score");
      total += quesScore;
      len++;
    }
    setScore(total);

    if (user) {
      var newMap = {};
      route.params.map.forEach((value, key) => {
        newMap[key] = Object.fromEntries(value);
      });
      setObjectMap(newMap);
      const usersCollectionRef = firestore()
        .collection("Users")
        .doc(user.uid)
        .collection("History");
      usersCollectionRef.add({
        score: total / (len / 10),
        doneAt: firestore.FieldValue.serverTimestamp(),
        map: newMap,
      });
    }
    setLoading(false);
    updateLeaderBoard();
  };
  const updateLeaderBoard = async () => {
    const subscriber = firestore()
      .collection("Users")
      .doc(user.uid)
      .collection("History")
      .orderBy("doneAt", "desc")
      .onSnapshot((querySnapshot) => {
        var value = 0;
        var len = 0;
        querySnapshot.forEach((documentSnapshot) => {
          value += documentSnapshot.data().score;
          len++;
        });
        firestore()
          .collection("Users")
          .doc(user.uid)
          .update({ avg: (value + score) / len });
      });
    return () => subscriber();
  };
  React.useEffect(() => {
    getScore();
  }, []);
  if (loading) {
    return (
      <ActivityIndicator
        color={COLORS.WHITE}
        size={"large"}
        animating={true}
        style={styles.animation}
      />
    );
  }
  return (
    <View style={styles.size}>
      <View style={styles.absolute}>{isLoading && <SimpleAnimatable />}</View>
      <Image
        style={styles.bgImg}
        source={{
          uri: LINKS.RESULTS_BG_IMG,
        }}
      />
      <View style={styles.absolute}>
        <View style={styles.col}>
          <SimpleAnimation />
          <Text style={styles.title}>{STRINGS.RESULTS}</Text>
          <Text style={styles.smallTitle}>{STRINGS.YOU_SCORED + score}</Text>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate(NAV.HOME)}>
              <Image
                style={styles.smallLogo}
                source={{ uri: LINKS.HOME_ICON }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(NAV.CATEGORIES)}
            >
              <Image
                style={styles.smallLogo}
                source={{ uri: LINKS.RETRY_ICON }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              onPress={() =>
                navigation.navigate(NAV.RESPONSES, {
                  map: objectMap,
                  score: score,
                })
              }
              style={styles.responses}
            >
              {STRINGS.RESPONSES}
            </Text>
            <Text
              onPress={() => navigation.navigate(NAV.HISTORY)}
              style={styles.history}
            >
              {STRINGS.HISTORY}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  smallLogo: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",

    width: 70,
    height: 70,
    borderRadius: 80,
    padding: 5,
  },
  row: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignContent: "center",
    alignSelf: "center",
    padding: 10,
    marginTop: 200,
    width: "80%",
  },
  col: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "80%",
    textAlign: "center",
    height: "100%",
  },
  container: {
    paddingTop: 50,
  },
  absolute: {
    width: "100%",
    height: "100%",
    flex: 1,
    position: "absolute",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
  },
  title: {
    marginTop: 40,
    fontWeight: STRINGS.BOLD,
    alignSelf: "center",
    fontSize: 50,
    color: COLORS.LIGHT_BLUE,
  },
  smallTitle: {
    fontSize: 40,
    color: COLORS.WHITE,
    fontWeight: STRINGS.BOLD,
    alignContent: "center",
    textAlign: "center",
    alignSelf: "center",
  },
  responses: {
    textAlign: "center",
    backgroundColor: COLORS.BLUE_BUTTON,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: COLORS.LIGHT_BLUE,
    color: COLORS.WHITE,
    margin: 15,
    padding: 15,
    paddingHorizontal: 40,
    fontSize: 30,
    borderRadius: 20,
  },
  bgImg: {
    height: "100%",
    width: "100%",
  },
  history: {
    textAlign: "center",
    backgroundColor: COLORS.BLACK,
    color: COLORS.WHITE,
    shadowColor: COLORS.WHITE,
    shadowRadius: 20,
    borderColor: COLORS.LIGHT_GREEN,
    borderRightWidth: 2,
    textShadowRadius: 2,
    textShadowColor: COLORS.WHITE,
    borderBottomWidth: 2,
    margin: 15,
    padding: 10,
    paddingHorizontal: 40,
    fontSize: 30,
    borderRadius: 20,
  },
  animation: {
    alignSelf: "center",
    justifyContent: "center",
    margin: 300,
    size: "large",
    color: COLORS.WHITE,
  },
  size: 
  {
     width: "100%",
    height: "100%" 
  },
});
