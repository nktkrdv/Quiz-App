import * as React from 'react'; 
import { View,Text,Button,StyleSheet,TextInput, TouchableOpacity } from 'react-native'

import {Auth} from '../Setup';
import {SignUpUser, SignInUser, SignOutUser,submitUser} from '../apiService';
import { firebase } from '@react-native-firebase/auth';
// import { NativeBaseConfigProvider } from 'native-base/lib/typescript/core/NativeBaseContext';
// import { TouchableOpacity } from 'react-native-gesture-handler';
export const AuthScreen = ({navigation}) => {
  const [state, setState] = React.useState({
    emailAddress: '',
    password: '',
  });
  const [user, setUser] = React.useState();
  const [userExist,setUserExist] = React.useState(true);
  // const [text, onChangeText] = React.useState("Useless Text");
  // const [number, onChangeNumber] = React.useState(null);

  const signUp = () => {
    if(state.emailAddress != "" || state.password != ""){
      SignUpUser(state.emailAddress, state.password)
        .then((data) => {
          // submitUser()
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
  const signIn = () => {
    if(state.emailAddress != '' || state.password != ''){
      SignInUser(state.emailAddress, state.password)
        .then((data) => {
          alert(data);
          navigation.navigate('Home');
          // alert(user.emailAddress);
        })
        .catch((error) => {
          alert(error);
        });
    }
    else{
      alert("Fill All details");
    }
  };
  const signOut = () => {
    SignOutUser()
      .then((data) => {
        alert(data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onAuthStateChanged = (user) => {
    setUser(user);
  };
  React.useEffect(() => {
    const user = firebase.auth().currentUser;
    if(user)
      navigation.navigate('Home');
    const subscriber = Auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  return (
    <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          value={state.emailAddress}
          placeholderTextColor='white'
          onChangeText={(text) => setState({...state,emailAddress: text})}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          
          placeholderTextColor='white'
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
  button:{
    width:'60%',
    textAlign:'center',
    backgroundColor:'#4b0082',
    color:'#fff',
    shadowColor:'#ffffff',
    shadowRadius:20,
    // shadwi
    borderColor:'#0000ff',
    // borderWidth:5,
    borderRightWidth:5,
    textShadowRadius:5,
    // shadowColor:'#ffffff',
    textShadowColor:'#ffffff',
    // borderTopWidth:5,
    borderBottomWidth:4,
    // bordersha
    // margin:30,
    alignSelf:'center',
    width:'100%',
    padding:10,

    // position:'absolute',
    paddingHorizontal:75,
    fontSize:30,
    borderRadius:20,
  },
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  // input: {
  //   // color:'#fff',
  //   height: 40,
  //   margin: 12,
  //   borderWidth: 1,
  //   padding: 10,
  // },
    text:{
      // margin:20,
      alignSelf:'center',
      color:'#fff',
        textAlign:'center',
        fontSize:50,
    },
    text2:{
      // margin:20,
      
      color:'#fff',
      fontSize:20,
    },
    temp:{
      textAlign:'center',
      color:'#fff',
      borderRadius:20,
    }
});