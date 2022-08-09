import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React from "react";
import LeaderBoardRow from "./components/leaderBoardGrid";
import { firestore, firebase } from "../Setup";
import SimpleAnimation from "./components/congratsAnimation";
import LINKS from "../assets/constants/links";
import STRINGS from "../assets/constants/strings";
import COLORS from "../assets/constants/colors";

const LeaderBoard = ({ navigation }) => {
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    const subscriber = firestore()
      .collection("Users")
      .orderBy("avg", "desc")
      .onSnapshot((querySnapshot) => {
        const users = [];
        var len = 0;
        querySnapshot.forEach((documentSnapshot) => {
          len++;
          users.push({
            ...documentSnapshot.data(),
            key: len,
          });
        });
        setUsers(users);
      });
    return () => subscriber();
  }, []);
  return (
    <View>
      <Image style={styles.size} source={{ uri: LINKS.LEADERBOARD_BG }} />
      <View style={styles.header}>
        <View style={styles.container}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={LINKS.UPPER_BG_IMG}
          />
          <Image
            resizeMode="cover"
            style={styles.img}
            source={LINKS.TROPHY_IMG}
          />
          <Text style={styles.text}>{STRINGS.LEADERBOARD}</Text>
        </View>
        <SimpleAnimation />
        <View>
          <FlatList
            style={styles.flatList}
            data={users}
            renderItem={({ item }) => (
              <LeaderBoardRow
                Points={item.avg.toFixed(2) * 100}
                Name={item.name}
                Number={item.key}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({
  flatList: {
    height: "62%",
    margin: 20,
  },
  size: {
    height: "100%",
    width: "100%",
  },
  container: {
    height: "35%",
    backgroundColor: COLORS.OCEAN_BLUE,
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
  },
  img: {
    marginTop: 20,
    height: "70%",
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    alignContent: "center",
    backgroundColor: COLORS.TRANSPARENT,
  },
  text: {
    fontSize: 30,
    color: COLORS.BLACK,
    textShadowColor: COLORS.LIGHT_GREEN,
    textShadowRadius: 20,
    fontWeight: STRINGS.BOLD,
    textAlign: "center",
  },
  header: {
    height: "100%",
    width: "100%",
    position: "absolute",
    flexDirection: "column",
  },
  image: {
    position: "absolute",
    height: "100%",
    width: "100%",
    borderRadius: 30,
  },
});
