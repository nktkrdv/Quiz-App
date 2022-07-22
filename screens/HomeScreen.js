import { Icon,Button, NativeBaseProvider } from 'native-base';
import * as React from 'react';
import { SignOutUser } from '../ApiService';
import { View, Text,Image,StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {

  // function to signOut
  const signOut = () => {
    SignOutUser()
      .then((data) => {
        alert(data);
        navigation.navigate('Auth');
      })
      .catch((error) => {
        alert(error);
      });
  };

  // jsx elements
    return (
        <View style={{height:'100%'}}>
        <Image
        style={styles.logo}
        source={{
          uri: 'https://imgs.search.brave.com/zwFL8XqPiywqVB1j_4me6_fxEJHehSYsJb7M06pcE8o/rs:fit:759:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC41/TXptMDNDSlhMT3cx/YS10UFlRSnRBSGFF/byZwaWQ9QXBp',
        }}
      />
          <View style = {styles.absolute}>
          
          <NativeBaseProvider>
          <Button onPress={signOut}>
        <Image
        style={styles.logout}
        source={{
          uri: 'https://p.kindpng.com/picc/s/312-3120740_logout-hd-png-download.png',
        }}
      />
            </Button>
          </NativeBaseProvider>
          <Image
        style={styles.minilogo}
        source={{
          uri: 'https://imgs.search.brave.com/AusNdRuyhQkT6YKW8BAL7MYD3cOq74hHGgMj-nxhNks/rs:fit:640:320:1/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/Ny8xMC8yMy80My9x/dWVzdGlvbi1tYXJr/LTI0OTIwMDlfNjQw/LmpwZw',
        }}
      />
            <Text style = {styles.title}>Quizzare</Text>
            <Text
                    style={styles.para}>Welcome to this awesome Quiz app, you can take a quiz for any topic. click below to start... </Text>
                <Text
                    onPress={() => navigation.navigate('Categories')}
                    style={styles.button}>Start</Text>
                <Text
                    onPress={() => navigation.navigate('History')}
                    style={styles.button2}>History</Text>
          </View>
        </View>
    );
}


//StyleSheets
const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    para:{
      fontSize:15,
      color:'#fff',
      alignSelf:'center',
      alignContent:'center',
      justifyContent:'center',
      textAlign:'center',
    },
    minilogo:{
      margin:30,
      marginTop:50,
      justifyContent:'center',
      height:'40%',
      width:'80%',
      borderRadius:50,
      borderColor:'#0000ff',
      borderWidth:2,
      borderBottomWidth:3,
      borderRightWidth:3,
    },
    absolute:{
      flex:1,
      height:'100%',
      width:'100%',
      position:'absolute',
      alignItems:'center',
      alignSelf:'center',
      justifyContent:'center',
      alignContent:'center',
      textAlign:'center',
      backgroundColor: 'transparent'
    },
    logout:{
      height:30,
      width:30,
      position:'absolute',
      alignContent:'flex-end',
      alignSelf:'flex-end',
    },
    title:{
      alignContent:'center',
      textAlign:'center',
      fontWeight:'bold',
      fontFamily:'serif',
      margin:20,
      fontSize:40,
      textShadowRadius:5,
      textShadowColor:'#fff',
      color: '#0000ff'
    },
    button:{
      width:'60%',
      textAlign:'center',
      backgroundColor:'#4b0082',
      color:'#fff',
      shadowColor:'#ffffff',
      shadowRadius:20,
      borderColor:'#0000ff',
      borderRightWidth:5,
      textShadowRadius:5,
      textShadowColor:'#ffffff',
      borderBottomWidth:4,
      margin:30,
      padding:10,
      paddingHorizontal:75,
      fontSize:30,
      borderRadius:20,
    },
    button2:{
      backgroundColor:'#000',
      textAlign:'center',
      width:'60%',
      color:'#fff',
      shadowColor:'#ffffff',
      shadowRadius:20,
      borderColor:'#0000ff',
      borderRightWidth:5,
      textShadowRadius:5,
      textShadowColor:'#ffffff',
      borderBottomWidth:4,
      margin:15,
      padding:10,
      paddingHorizontal:40,
      fontSize:30,
      borderRadius:20,
    },
    logo: {
      width: '100%',
      height: '100%',
      justifyContent:'center',
      alignContent:'center',
      alignSelf:'center'
    },
  });