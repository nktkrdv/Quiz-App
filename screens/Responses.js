import { View, Text ,ScrollView,StyleSheet} from 'react-native'
import React from 'react'
import Items from '../components/Items'
import { useRoute } from '@react-navigation/native';

const Responses = () => {
    const route = useRoute();
    const {answerMap} = route.params.map;
    {console.log(route.params.map.get(0))}
  return (
    <View>
        <ScrollView>
        <Text>Hello</Text>
            <Items map={route.params.map.get(0)} qno = {1}/>
            <Items map={route.params.map.get(1)} qno={2} />
            <Items map={route.params.map.get(2)} qno={3}/>
            <Items map={route.params.map.get(3)} qno={4}/>
            <Items map={route.params.map.get(4)} qno={5}/>
            <Items map={route.params.map.get(5)} qno={6}/>
            <Items map={route.params.map.get(6)} qno={7}/>
            <Items map={route.params.map.get(7)} qno={8}/>
            <Items map={route.params.map.get(8)} qno={9}/>
            <Items map={route.params.map.get(9)} qno={10}/>
            <Text style = {styles.title}>Total : {route.params.score}</Text>
        </ScrollView>
    </View>
  )
}

export default Responses

const styles = StyleSheet.create({
    // it('should first', () => { second })
    
    title:{
        fontSize:30,
        color:'white',
        alignSelf:'center',
        backgroundColor:'#4b0082',
        margin:10,
        width:'100%',
        padding:10,
        textAlign:'center',
        borderRadius:20,
        alignContent:'center',
        borderRightWidth:5,
        borderBottomWidth:5,
        borderColor:'#0000ff'
    },
    absolute:{
        alignSelf:'center',
        alignContent:'center',
        alignItems:'center',

        justifyContent:'center',

        // ali
        margin:50,
        color:'white'
    }
})