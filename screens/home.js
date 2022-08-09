import { Icon, Button, NativeBaseProvider } from "native-base";
import * as Animatable from "react-native-animatable";
import * as React from "react";
import { SignOutUser } from "../ApiService";
import {
  View,
  ToastAndroid,
  Text,
  Image,
  StyleSheet,
  LogBox,
  Modal,
} from "react-native";
import { firebase } from "@react-native-firebase/auth";
import { TouchableOpacity } from "react-native-gesture-handler";
import LINKS from "../assets/constants/links";
import COLORS from "../assets/constants/colors";
import NAV from "../assets/constants/navigation";
import STRINGS from "../assets/constants/strings";
LogBox.ignoreLogs(["Require cycle:"]);

export default function HomeScreen({ navigation }) {
  const [show, setShow] = React.useState(true);
  const [mess, setMess] = React.useState("");
  const [icon, setIcon] = React.useState("");
  React.useEffect(() => {
    if (firebase.auth().currentUser == null) {
      navigation.navigate(NAV.AUTH);
    }
  }, []);
  // function to signOut
  const signOut = () => {
    SignOutUser()
      .then((data) => {
        ToastAndroid.show(data, ToastAndroid.LONG);
        navigation.navigate(NAV.AUTH);
      })
      .catch((error) => {
        setShow(true);
        setMess(error + "");
        setIcon(LINKS.ERROR_IMG);
      });
  };

  // jsx elements
  return (
    <View style={styles.absolute}>
      <Image
        style={styles.logo}
        source={{
          uri: LINKS.HOME_BG,
        }}
      />
      <View style={styles.absolute}>
        <View style={styles.reverseRow}>
          <TouchableOpacity onPress={() => signOut()}>
            <Image
              style={styles.logout}
              source={{
                uri: LINKS.LOGOUT_ICON,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NAV.LEADERBOARD);
            }}
          >
            <Image
              resizeMode="stretch"
              style={styles.logout}
              source={{
                uri: LINKS.LEADERBOARD_ICON,
              }}
            />
          </TouchableOpacity>
        </View>
        <Image
          style={styles.miniLogo}
          source={{
            uri: LINKS.LOGO,
          }}
        />
        <Animatable.View>
          <Animatable.Text
            style={styles.title}
            animation="zoomIn"
            iterationCount={1}
            direction="normal"
          >
            {STRINGS.TITLE}
          </Animatable.Text>
        </Animatable.View>
        <Text style={styles.para}>{STRINGS.WELCOME_STRING}</Text>
        <Text
          onPress={() => navigation.navigate(NAV.CATEGORIES)}
          style={styles.button}
        >
          {STRINGS.START}
        </Text>
        <Text
          onPress={() => navigation.navigate(NAV.HISTORY)}
          style={styles.historyBtn}
        >
          {STRINGS.HISTORY}
        </Text>
      </View>
    </View>
  );
}

//StyleSheets
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  para: {
    fontSize: 15,
    color: COLORS.WHITE,
    textAlign: "center",
  },
  miniLogo: {
    margin: 30,
    marginTop: 50,
    height: "40%",
    width: "80%",
    borderRadius: 50,
    borderColor: COLORS.BLUE,
    borderWidth: 2,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  absolute: {
    flex: 1,
    height: "100%",
    width: "100%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  logout: {
    height: 50,
    width: 50,
    margin: 10,
    alignSelf: "center",
    justifyContent: "space-around",
    alignContent: "flex-end",
    borderRadius: 40,
  },
  title: {
    fontWeight: "bold",
    fontFamily: "serif",
    margin: 20,
    fontSize: 40,
    color: COLORS.LIGHT_GREEN,
  },
  button: {
    width: "60%",
    textAlign: "center",
    backgroundColor: COLORS.BLUE_BUTTON,
    color: COLORS.WHITE,
    shadowRadius: 20,
    borderColor: COLORS.GREEN,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    margin: 30,
    padding: 10,
    fontSize: 30,
    borderRadius: 20,
  },
  historyBtn: {
    backgroundColor: COLORS.BLACK,
    textAlign: "center",
    width: "60%",
    color: COLORS.WHITE,
    borderColor: COLORS.GREEN,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    margin: 15,
    padding: 10,
    fontSize: 30,
    borderRadius: 20,
  },
  logo: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  reverseRow: {
    flexDirection: "row-reverse",
    height: "100%",
    width: "100%",
    margin: 10,
    position: "absolute",
  },
});
