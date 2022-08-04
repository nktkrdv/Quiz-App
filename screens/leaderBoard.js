import { View, Text ,Image, StyleSheet,FlatList} from 'react-native'
import React from 'react'
// import { FlatList, ScrollView } from 'react-native-gesture-handler'
import LeaderBoardRow from './components/leaderBoardGrid';
import { firestore,firebase } from '../Setup';
import Items from './components/itemHistory';
import SimpleAnimation from './components/congratsAnimation';



const LeaderBoard = ({navigation}) => {
    const [users, setUsers] = React.useState([]);
    const trophyImg = require('../assets/images/trophyImg.png');
    const upbgImg = require('../assets/images/leaderbg.png')
    const bgImg = 'https://t4.ftcdn.net/jpg/03/18/89/75/400_F_318897549_LBKxBUAFlnCHVDjpbOjSitnZ9tUqnCjy.jpg';
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
    <Image resizeMode='cover' style={{position:'absolute',height:'100%',width:'100%',borderRadius:30}} source={upbgImg} />
      <Image resizeMode='cover' style={styles.img} source={trophyImg} />
      <Text style={styles.text}>LeaderBoard</Text>
      <SimpleAnimation/>
    </View>
    <View>
      <FlatList style={{height:'62%',margin:20}}
      data={users}
      renderItem={({ item }) => (
        <LeaderBoardRow Points={item.avg.toFixed(2)*100} Name={item.name} Number={item.key} />
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
    backgroundColor:'#0198e1',
    borderBottomEndRadius:40,
    borderBottomStartRadius:40,
  },
  img:{
    marginTop:20,
    height:'70%',
    width:'80%',
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
  }
})