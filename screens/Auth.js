import * as React from 'react'; 
import { View,Text,Button,StyleSheet,TextInput, TouchableOpacity,Image } from 'react-native'

import {Auth} from '../Setup';
import {SignUpUser, SignInUser, SignOutUser,submitUser} from '../ApiService';
import { firebase } from '@react-native-firebase/auth';

export const AuthScreen = ({navigation}) => {
  const [user, setUser] = React.useState();
  const [userExist,setUserExist] = React.useState(true);
  const [state, setState] = React.useState({
    emailAddress: '',
    password: '',
  });


  // method for SignUp
  const signUp = () => {
    if(state.emailAddress != "" || state.password != ""){
      SignUpUser(state.emailAddress, state.password)
        .then((data) => {
          alert(data);
          navigation.navigate('Home');
        })
        .catch((error) => {
          alert(error);
        });
    }
    else{
      alert('Fill All details');
    }
  };

  // method for signIn
  const signIn = () => {
    if(state.emailAddress != '' || state.password != ''){
      SignInUser(state.emailAddress, state.password)
        .then((data) => {
          alert(data);
          navigation.navigate('Home');
        })
        .catch((error) => {
          alert(error);
        });
    }
    else{
      alert("Fill All details");
    }
  };

  // onAuthStateChanged set user as new user
  const onAuthStateChanged = (user) => {
    setUser(user);
  };

  // If User is logged in already then directly sent them to HomeScreen
  React.useEffect(() => {
    const user = firebase.auth().currentUser;
    if(user)
      navigation.navigate('Home');
    const subscriber = Auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <View style={styles.container}>
    <Image
        style={styles.minilogo}
        source={{
          uri: 'https://imgs.search.brave.com/AusNdRuyhQkT6YKW8BAL7MYD3cOq74hHGgMj-nxhNks/rs:fit:640:320:1/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/Ny8xMC8yMy80My9x/dWVzdGlvbi1tYXJr/LTI0OTIwMDlfNjQw/LmpwZw',
        }}
      />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          value={state.emailAddress}
          placeholderTextColor='black'
          onChangeText={(text) => setState({...state,emailAddress: text})}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          
          placeholderTextColor='black'
          onChangeText={(text) => setState({...state,password: text})}/>
        {userExist ? ( 
          <View>

        <TouchableOpacity style={styles.button} onPress={signIn}>
          <Text style={styles.text2}>Sign In</Text>
        </TouchableOpacity>
          <Text style={styles.text2} onPress={()=>setUserExist(false)}>Don't Have a account? Click here</Text>
        </View> )
        : ( 
          <View>
          <TouchableOpacity onPress={signUp} style={styles.button}>
          <Text style={styles.text2}>Sign Up</Text>
        </TouchableOpacity>
          <Text style={styles.text2} onPress={()=>setUserExist(true)}>Existing User? Click here</Text>
        </View> )
        }
      </View>
  );
};

const styles = StyleSheet.create({
  minilogo:{
    margin:30,
    marginTop:50,
    justifyContent:'center',
    height:'40%',
    width:'80%',
    borderRadius:50,
    borderColor:'#0000ff',
    // borderBottomColor:'#fff',
    borderWidth:2,
    borderBottomWidth:3,
    borderRightWidth:3,
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
    alignSelf:'center',
    width:'100%',
    padding:10,
    paddingHorizontal:75,
    fontSize:30,
    borderRadius:20,
  },
  input: {
    width: '70%',
    height: 55,
    backgroundColor: '#fff',
    fontWeight:'bold',
    margin: 10,
    padding: 8,
    color: 'black',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#301934'
  },
    text:{
      alignSelf:'center',
      color:'#000',
        textAlign:'center',
        fontSize:50,
    },
    text2:{
      color:'#fff',
      fontSize:20,
    },
    temp:{
      textAlign:'center',
      color:'#fff',
      borderRadius:20,
    }
});