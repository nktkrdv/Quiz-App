import * as React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BlurView } from "expo-blur";
import CountDown from "react-native-countdown-component";
import { useRoute, CommonActions } from "@react-navigation/native";
import LoadingAnimation from "./components/loadingAnime";
import COLORS from "../assets/constants/colors";
import LINKS from "../assets/constants/links";
import STRINGS from "../assets/constants/strings";
import NAV from "../assets/constants/navigation";

export default function Quiz({ navigation }) {
  const [optionsList, setOptionsList] = React.useState([]);
  const [isRunning, setIsRunning] = React.useState(true);
  const [questions, setQuestions] = React.useState();
  const [qnum, setQues] = React.useState(0);
  const [options, setOptions] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showMenu, setShowMenu] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [questionGrid, setQuestionGrid] = React.useState([]);
  const Route = useRoute();
  const [time, setTime] = React.useState(10);
  const [len, setLen] = React.useState(10);
  const l = Route.params.time;
  function ButtonImg({ img }) {
    return <Image style={styles.bottomButton} source={{ uri: img }} />;
  }
  // function for Grid of Question status
  function QuesStatusGrid() {
    return (
      <View style={styles.statusGrid}>
        <TouchableOpacity
          onPress={() => {
            setShowMenu(false);
          }}
        >
          <Image style={styles.miniLogo} source={{ uri: LINKS.CANCEL_IMG }} />
        </TouchableOpacity>

        <View style={styles.instrCol}>
          <View style={styles.InstrRow}>
            <Text style={styles.blue}>{STRINGS.SPACE}</Text>
            <Text style={styles.instr}>{STRINGS.NOT_ANS}</Text>
          </View>
          <View style={styles.InstrRow}>
            <Text style={styles.green}>{STRINGS.SPACE}</Text>
            <Text style={styles.instr}>{STRINGS.ANS}</Text>
          </View>
        </View>

        <FlatList
          style={styles.flatList}
          columnWrapperStyle={styles.contentContainerStyle}
          contentContainerStyle={styles.contentContainerStyle}
          data={questionGrid}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setQues(item.key);
                setOptions(generateOptionsAndShuffle(questions[item.key]));
                setShowMenu(false);
              }}
            >
              <Text
                style={
                  answerMap.get(item.key) != undefined &&
                  answerMap.get(item.key).get("chosen") != ""
                    ? [
                        styles.btnGreen,
                        {
                          marginBottom:
                            l <= 12
                              ? 100
                              : l <= 24
                              ? 40
                              : l < 30
                              ? 15
                              : l <= 40
                              ? 5
                              : 0,
                        },
                      ]
                    : [
                        styles.btnBlue,
                        {
                          marginBottom:
                            l < 15
                              ? 100
                              : l <= 24
                              ? 40
                              : l <= 30
                              ? 15
                              : l <= 40
                              ? 5
                              : 0,
                        },
                      ]
                }
              >
                {item.key + 1}
              </Text>
            </TouchableOpacity>
          )}
          numColumns={l < 6 ? 2 : l < 15 ? 3 : l < 32 ? 4 : 5}
        />

        <View style={styles.bottom_row}>
          <TouchableOpacity
            onPress={() => {
              setIsRunning(false);
              navigation.navigate(NAV.HOME);
            }}
          >
            <Text style={styles.end}>{STRINGS.QUIT_QUIZ}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsRunning(false);
              handleShowResult();
            }}
          >
            <ButtonImg img={LINKS.SUBMIT_ICON} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  const [answerMap, setMyMap] = React.useState(new Map());
  const updateMap = (k, v) => {
    setMyMap(new Map(answerMap.set(k, v)));
  };
  const getQuiz = async () => {
    setIsLoading(true);
    const url = Route.params.link;
    const res = await fetch(url);
    if (res == null) return;
    const data = await res.json();
    setQuestions(data.results);
    setOptions(generateOptionsAndShuffle(data.results[0]));
    setIsLoading(false);
    const questionNos = [];
    setLen(data.results.length);
    setTime(35);
    for (var i = 0; i < data.results.length; i++) {
      questionNos.push({
        key: i,
      });
    }
    setQuestionGrid(questionNos);
  };

  React.useEffect(() => {
    getQuiz();
  }, []);

  const previousClick = () => {
    setQues(qnum - 1);
    setOptions(generateOptionsAndShuffle(questions[qnum - 1]));
  };
  const handleNextPress = () => {
    if (answerMap.get(qnum) == undefined)
      updateMap(
        qnum,
        new Map([
          ["chosen", ""],
          ["correct", questions[qnum].correct_answer],
          ["score", 0],
          ["question", questions[qnum].question],
        ])
      );
    setQues(qnum + 1);
    setOptions(generateOptionsAndShuffle(questions[qnum + 1]));
  };

  const generateOptionsAndShuffle = (_question) => {
    const options = [..._question.incorrect_answers];
    options.push(_question.correct_answer);
    shuffleArray(options);
    const flatOptions = [];
    for (var i = 0; i < options.length; i++) {
      flatOptions.push({ key: i });
    }
    console.log(flatOptions);
    setOptionsList(flatOptions);
    return options;
  };

  const handleSelectedOption = (_option) => {
    if (_option === questions[qnum].correct_answer) {
      setScore(score + 10);
      updateMap(
        qnum,
        new Map([
          ["chosen", _option],
          ["correct", questions[qnum].correct_answer],
          ["score", 10],
          ["question", questions[qnum].question],
        ])
      );
    } else {
      updateMap(
        qnum,
        new Map([
          ["chosen", _option],
          ["correct", questions[qnum].correct_answer],
          ["score", 0],
          ["question", questions[qnum].question],
        ])
      );
    }
    if (qnum !== len - 1) {
      setQues(qnum + 1);
      setOptions(generateOptionsAndShuffle(questions[qnum + 1]));
    }
    if (qnum === len - 1) {
      showResult();
    }
  };
  const showResult = () => {
    handleShowResult();
    setIsRunning(false);
    navigation.navigate("Result", {
      map: answerMap,
    });
  };
  const handleShowResult = () => {
    for (var i = 0; i < len; i++) {
      if (answerMap.get(i) == undefined)
        updateMap(
          i,
          new Map([
            ["chosen", ""],
            ["correct", questions[i].correct_answer],
            ["score", 0],
            ["question", questions[i].question],
          ])
        );
    }
    setIsRunning(false);
    navigation.navigate("Result", {
      map: answerMap,
    });
  };
  const handleMenu = () => {
    setShowMenu(true);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  return (
    <View style={styles.hundred}>
      <View style={styles.absolute}>
        <Image
          style={styles.bgImg}
          source={{
            uri: LINKS.QUIZ_BGIMG,
          }}
        />
      </View>
      <View
        
      >
        {isLoading && <LoadingAnimation />}
      </View>
      {questions && (
        <View style={styles.absolute}>
          <View style={styles.header}>
            <Text style={styles.quesTitle}>Q. {qnum + 1}</Text>
            <CountDown
              style={{ margin: 20 }}
              until={Route.params.time * 10}
              running={isRunning}
              timeToShow={["M", "S"]}
              digitStyle={{ backgroundColor: COLORS.BLUE }}
              showSeparator={false}
              digitTxtStyle={{ color: COLORS.LIGHT_GREEN }}
              timeLabelStyle={{ color: COLORS.TRANSPARENT }}
              // onFinish={() => {
              //   alert("Time Out");
              //   handleShowResult();
              // }}
              size={20}
            />
            <TouchableOpacity onPress={handleMenu}>
              <Image
                style={styles.miniLogo}
                source={{ uri: LINKS.MENU_ICON }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.col}>
            <Text style={styles.para}>
              Q. {decodeURIComponent(questions[qnum].question)}
            </Text>
            <View style={styles.seventy}>
              <FlatList
                data={optionsList}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={
                      answerMap.get(qnum) != undefined &&
                      answerMap.get(qnum).get("chosen") == options[item.key]
                        ? styles.chosen
                        : styles.options
                    }
                    onPress={() => handleSelectedOption(options[item.key])}
                  >
                    <View style={styles.flexDirection}>
                      <Text
                        style={styles.opt}
                      >
                        {String.fromCharCode(65 + item.key)}.
                      </Text>
                      <Text style={styles.para}>
                        {decodeURIComponent(options[item.key])}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
          <View style={styles.row}>
            {qnum !== 0 ? (
              <TouchableOpacity onPress={() => previousClick()}>
                <ButtonImg img={LINKS.PREV_ICON} />
              </TouchableOpacity>
            ) : (
              <Text style={styles.empty}> </Text>
            )}
            <Text
              onPress={() => {
                setIsRunning(false);
                navigation.navigate("Categories");
              }}
              style={styles.end}
            >
              {STRINGS.QUIT_QUIZ}
            </Text>
            {qnum == len - 1 ? (
              <TouchableOpacity onPress={() => handleShowResult()}>
                <ButtonImg img={LINKS.SUBMIT_ICON} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handleNextPress()}>
                <ButtonImg img={LINKS.NEXT_ICON} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
      {showMenu && (
        <BlurView intensity={122} tint="dark" style={styles.container}>
          <QuesStatusGrid />
        </BlurView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  col: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: "70%",
  },
  seventy: {
    height: "70%",
  },
  chosen: {
    fontSize: 20,
    backgroundColor: COLORS.GREEN,
    margin: 15,
    width: "75%",
    alignContent: "center",
    alignSelf: "center",
    borderColor: COLORS.LIGHT_GREEN,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    color: COLORS.BLACK,
    borderRadius: 20,
  },
  hundred: {
    height: "100%",
  },
  absolute: {
    height: "100%",
    position: "absolute",
    alignSelf: "center",
    height: "100%",
    width: "100%",
    resizeMode: "stretch",
    textAlign: "center",
    backgroundColor: COLORS.TRANSPARENT,
  },
  options: {
    fontSize: 20,
    backgroundColor: COLORS.TEAL,
    margin: 10,
    width: "70%",
    alignSelf: "center",
    borderColor: COLORS.BLUE,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderRadius: 20,
  },
  empty: {
    width: "15%",
  },
  statusGrid: {
    height: "100%",
    width: "80%",
  },
  para: {
    fontSize: 20,
    padding: 10,
    width: "80%",
    maxWidth: "80%",
    fontWeight: STRINGS.BOLD,
    color: COLORS.WHITE,
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  question: {
    margin: 30,
    backgroundColor: COLORS.BLACK,
    alignContent: "center",
    textAlign: "center",
    fontWeight: STRINGS.BOLD,
    fontFamily: "serif",
    margin: 20,
    fontSize: 40,
    textShadowRadius: 5,
    textShadowColor: COLORS.LIGHT_GREEN,
    color: COLORS.WHITE,
  },
  quesTitle: {
    marginLeft: 20,
    fontWeight: STRINGS.BOLD,
    alignSelf: "center",
    fontSize: 30,
    color: COLORS.WHITE,
  },
  logo: {
    width: 360,
    height: 760,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.TRANSPARENT,
  },
  innerContainer: {
    height: "80%",
    maxHeight: "80%",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: COLORS.TRANSPARENT,
    color: COLORS.WHITE,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  aligncenter: {
    flex: "row",
    alignContent: "center",
  },
  categoryTitle: {
    color: COLORS.WHITE,
    marginBottom: 10,
    fontSize: 20,
  },
  previous: {
    backgroundColor:COLORS.LIGHT_BLUE,
    color: COLORS.BLACK,
    shadowColor: COLORS.WHITE,
    shadowRadius: 20,
    fontWeight: STRINGS.BOLD,
    borderColor: COLORS.BLACK,
    borderRightWidth: 2,
    textShadowRadius: 5,
    textShadowColor: COLORS.LIGHT_GREEN,
    borderBottomWidth: 2,
    padding: 15,
    margin: 30,
    paddingHorizontal: 15,
    fontSize: 30,
    borderRadius: 20,
  },
  next: {
    backgroundColor: COLORS.GREEN,
    color: COLORS.WHITE,
    shadowColor:COLORS.WHITE,
    shadowRadius: 20,
    fontWeight: STRINGS.BOLD,
    borderColor: COLORS.WHITE,
    borderRightWidth: 2,
    textShadowRadius: 2,
    textShadowColor: COLORS.LIGHT_GREEN,
    borderBottomWidth: 2,
    paddingHorizontal: 30,
    padding: 15,
    margin: 30,
    paddingHorizontal: 40,
    fontSize: 30,
    borderRadius: 20,
  },
  logo: {
    width: "100%",
    height: 700,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  bottomContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  btnGreen: {
    color: COLORS.BLACK,
    backgroundColor:COLORS.GREEN,
    borderRadius: 30,
    fontSize: 20,
    borderColor: COLORS.LIGHT_GREEN,
    borderBottomWidth: 3,
    borderRightWidth: 2,
    fontWeight: STRINGS.BOLD,
    textAlign: "center",
    padding: 10,
    height: 50,
    width: 50,
  },
  btnBlue: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.BLUE_BUTTON,
    borderColor: COLORS.BLUE,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    fontSize: 20,
    textAlign: "center",
    height: 50,
    borderRadius: 30,
    padding: 10,
    fontWeight: STRINGS.BOLD,
    width: 50,
  },
  column: {
    justifyContent: "space-evenly",
    flexDirection: "column",
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
  },
  miniLogo: {
    marginTop: 20,
    height: 40,
    width: 40,
    borderRadius: 30,
    alignSelf: "flex-end",
    marginRight: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    width: "90%",
    height: "12%",
    alignContent: "center",
    alignSelf: "center",
    backgroundColor: COLORS.GREEN,
    borderColor: COLORS.WHITE,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderRadius: 20,
    marginBottom: 20,
  },
  instr: {
    color: COLORS.WHITE,
    fontSize: 20,
  },
  blue: {
    backgroundColor: COLORS.BLUE_BUTTON,
    fontSize: 25,
    marginRight: 10,
    borderRadius: 200,
  },
  green: {
    backgroundColor: COLORS.GREEN,
    fontSize: 25,
    marginRight: 10,
    borderRadius: 20,
  },
  timer: {
    marginTop: 20,
  },
  instrCol: {
    flexDirection: "column",
    margin: 10,
  },
  InstrRow: {
    alignSelf: "flex-start",
    flexDirection: "row",
    margin: 10,
  },
  bottomButton: {
    height: 60,
    alignItems: "center",
    resizeMode: "cover",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    width: 60,
    borderRadius: 40,
  },
  end: {
    backgroundColor: COLORS.BLACK,
    fontSize: 20,
    color: COLORS.WHITE,
    textAlign: "center",
    borderWidth: 1,
    borderBottomColor: COLORS.LIGHT_BLUE,
    borderRightColor: COLORS.LIGHT_BLUE,
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  flatList: {
    alignSelf: "center",
    width: "90%",
    height: "70%",
  },
  contentContainerStyle: {
    justifyContent: "space-between",
    alignContent: "space-between",
    alignItems: "stretch",
    alignSelf: "stretch",
  },
  bottom_row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 20,
  },
  flexDirection:{
    flexDirection:'row',
  },
  bgImg: {
    resizeMode: "stretch",
    height: "100%",
    width: "100%",
  },
  opt:{
    fontSize: 20,
    fontWeight: STRINGS.BOLD,
    color: COLORS.WHITE,
    textAlignVertical: "center",
    marginLeft: 5,
  }
});
