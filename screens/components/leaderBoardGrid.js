import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import LINKS from "../../assets/constants/links";
import COLORS from "../../assets/constants/colors";
import STRINGS from "../../assets/constants/strings";

function ButtonImg({ img }) {
  return <Image style={styles.background} source={img} />;
}

const LeaderBoardRow = ({ Number, Name, Points }) => {
  return (
    <View style={styles.row}>
      {Number > 3 ? (
        <Text style={styles.text}>{Number}</Text>
      ) : (
        <ButtonImg
          img={
            Number == 1
              ? LINKS.GOLD
              : Number == 2
              ? LINKS.SILVER
              : Number == 3
              ? LINKS.BRONZE
              : ""
          }
        />
      )}

      <View
        style={
          Number == 1
            ? [styles.list_item, { backgroundColor: COLORS.GOLD }]
            : Number == 2
            ? [styles.list_item, { backgroundColor: COLORS.SILVER }]
            : Number == 3
            ? [styles.list_item, { backgroundColor: COLORS.BRONZE }]
            : styles.list_item
        }
      >
        <Text style={styles.name}>{Name}</Text>
        <Text style={styles.pts}>{Points} Pts.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  row: {
    flexDirection: "row",
  },
  list_item: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    margin: 10,
    color: COLORS.BLACK,
    width: "80%",
    alignSelf: "center",
    backgroundColor: COLORS.LIGHT_BLUE,
    padding: 15,
    borderColor: COLORS.WHITE,
    borderBottomWidth: 3,
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    width: "15%",
    color: COLORS.WHITE,
    borderRadius: 40,
    textAlignVertical: "center",
    fontWeight: STRINGS.BOLD,
    marginTop: 10,
    marginBottom: 10,
  },
  highlighted: {
    textAlign: "center",
    fontSize: 20,
    color: COLORS.BLUE,
    fontWeight: STRINGS.BOLD,
  },
  bottomButton: {
    height: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    width: "18%",
    borderRadius: 40,
  },
  name: {
    width: "50%",
    fontSize: 15,
    fontWeight: STRINGS.BOLD,
  },
  pts: {
    width: "30%",
    fontSize: 15,
    fontWeight: STRINGS.BOLD,
  },
  background: {
    height: "110%",
    width: "15%",
    resizeMode: "cover",
    paddingTop: 3,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 8,
  },
});

export default LeaderBoardRow;
