import { View, Text ,Image, StyleSheet,FlatList} from 'react-native'
import React from 'react'
// import { FlatList, ScrollView } from 'react-native-gesture-handler'
import LeaderBoardRow from './components/leaderBoardGrid';
import { firestore,firebase } from '../Setup';
import Items from './components/itemHistory';

const LeaderBoard = ({navigation}) => {
    const [users, setUsers] = React.useState([]);
    const trophyImg = 'https://cdn-icons-png.flaticon.com/512/806/806129.png'
    const bgImg = 'data:image/jpeg;base64,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';
    React.useEffect(() => {
      const subscriber =firestore()
        .collection('Users')
        .orderBy('avg','desc')
        .onSnapshot(querySnapshot => {
          const users = [];
          var value = 0;
          var len = 0;
        querySnapshot.forEach(documentSnapshot => {
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
    <Image style={{height:'100%',width:'100%'}} source={{uri:bgImg}} />
    <View style={{height:'100%',width:'100%',position:'absolute', flexDirection:'column'}}>
    <View style={styles.container}>
      <Image resizeMode='cover' style={styles.img} source={{uri:trophyImg}} />
      <Text style={styles.text}>LeaderBoard</Text>
    </View>
    <View>
      <FlatList style={{height:'67%'}}
      data={users}
      renderItem={({ item }) => (
        <LeaderBoardRow Points={item.avg.toFixed(2)*100} Name={item.name} Number={item.key} />
        // <Items/>
      )}
    />
      </View>
    </View>
    </View>
  )
}

export default LeaderBoard

const styles = StyleSheet.create({
  container:{
    height:'35%',
    backgroundColor:'#5d3fd3',
    borderBottomEndRadius:40,
    borderBottomStartRadius:40,
  },
  img:{
    marginTop:20,
    height:'70%',
    width:'50%',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'space-between',
    alignContent:'center',
    backgroundColor:'transparent'
  },
  text:{
    fontSize:30,
    color:'#fff',
    fontWeight:'bold',
    textAlign:'center',
    margin:5,
  }
})