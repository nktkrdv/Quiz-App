import * as React from 'react'; 
import { View,Text,Button,StyleSheet,TextInput, TouchableOpacity,Image, Modal, ToastAndroid } from 'react-native'
import {Auth, firestore} from '../Setup';
import {SignUpUser, SignInUser, SignOutUser,submitUser} from '../ApiService';
import { firebase } from '@react-native-firebase/auth';
import SignInModal from './components/modal';
import LINKS from '../assets/constants/links';
import STRINGS from '../assets/constants/strings';
import NAV from '../assets/constants/navigation';
import COLORS from '../assets/constants/colors';

export const AuthScreen = ({navigation}) => {
  const childRef = React.useRef(null);
  const [show,setShow] = React.useState(false);
  const [user, setUser] = React.useState();
  const [mess,setMess] = React.useState();
  const [icon,setIcon] = React.useState();
  const [userExist,setUserExist] = React.useState(true);
  const [state, setState] = React.useState({
    emailAddress: '',
    password: '',
    Name:'',
  });


  // method for SignUp
  const signUp = () => {
    if(state.emailAddress != "" && state.password != "" && state.Name != ""){
      SignUpUser(state.emailAddress, state.password)
        .then((data) => {
          const usr = firebase.auth().currentUser;
          firestore().collection('Users').doc(usr.uid).set({
            email:state.emailAddress,
            name: state.Name,
            avg:0,
          })
          ToastAndroid.show(data,ToastAndroid.LONG);
          navigation.navigate(NAV.HOME);
        })
        .catch((error) => {
          setShow(true);
          setMess(error+'')
          setIcon(LINKS.ERROR_IMG);
        });
    }
    else{
      setShow(true);
      setMess(STRINGS.FILL_ALL);
      setIcon(LINKS.ERROR_IMG);
    }
  };

  // method for signIn
  const signIn = () => {
    if(state.emailAddress != '' && state.password != ''){
      SignInUser(state.emailAddress, state.password)
        .then((data) => {
          ToastAndroid.show(data,ToastAndroid.LONG);
          navigation.navigate(NAV.HOME);
        })
        .catch((error) => {
          setShow(true);
          setMess(error+'')
          setIcon(LINKS.ERROR_IMG);
        });
    }
    else{
      setIcon(LINKS.ERROR_IMG);
      setMess(STRINGS.FILL_ALL);
      setShow(true);
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
      navigation.navigate(NAV.HOME);
    const subscriber = Auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <View style={styles.container}>
    <Image
        style={styles.miniLogo}
        source={{
          uri: LINKS.AUTH_BG,
        }}
      />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          value={state.emailAddress}
          placeholderTextColor={COLORS.BLACK}
          onChangeText={(text) => setState({...state,emailAddress: text})}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          
          placeholderTextColor={COLORS.BLACK}
          onChangeText={(text) => setState({...state,password: text})}/>
          {!userExist && <TextInput
          style={styles.input}
          placeholder='Name'
          autoCapitalize="none"
          
          placeholderTextColor={COLORS.BLACK}
          onChangeText={(text) => setState({...state,Name: text})}/>}
          
        {userExist ? ( 
          <View>

        <TouchableOpacity style={styles.button} onPress={signIn}>
          <Text style={styles.para}>{STRINGS.SIGN_IN}</Text>
        </TouchableOpacity>
          <Text style={styles.para} onPress={()=>setUserExist(false)}>{STRINGS.NEWUSER}</Text>
        </View> )
        : ( 
          <View>
          <TouchableOpacity onPress={signUp} style={styles.button}>
          <Text style={styles.para}>{STRINGS.SIGN_UP}</Text>
        </TouchableOpacity>
          <Text style={styles.para} onPress={()=>setUserExist(true)}>{STRINGS.EXISTINGuSER}</Text>
        </View> )
        }
        <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => {
          setShow(false);
        }}
      >
      <TouchableOpacity onPress={()=>setShow(false)}>
        <SignInModal message={mess} icon={icon} />
      </TouchableOpacity>
        </Modal>
        </View>
  );
};

const styles = StyleSheet.create({
  miniLogo:{
    margin:30,
    marginTop:50,
    justifyContent:'center',
    height:'40%',
    width:'80%',
    borderRadius:50,
    borderColor:COLORS.BLUE,
    borderWidth:2,
    borderBottomWidth:3,
    borderRightWidth:3,
  },
  button:{
    width:'60%',
    textAlign:'center',
    alignItems:'center',
    backgroundColor:COLORS.BLUE_BUTTON,
    color:COLORS.WHITE,
    borderColor:COLORS.GREEN,
    borderRightWidth:2,
    borderBottomWidth:2,
    alignSelf:'center',
    width:200,
    padding:10,
    fontSize:30,
    borderRadius:20,
  },
  input: {
    width: '70%',
    height: 55,
    backgroundColor: COLORS.WHITE,
    fontWeight:'bold',
    margin: 10,
    padding: 8,
    color: COLORS.BLACK,
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:'100%',
    width:'100%',
    backgroundColor:COLORS.AUTH_BG
  },
    text:{
      alignSelf:'center',
      color:COLORS.BLACK,
        textAlign:'center',
        fontSize:50,
    },
    para:{
      color:COLORS.WHITE,
      fontSize:20,
    },
    temp:{
      textAlign:'center',
      color:COLORS.WHITE,
      borderRadius:20,
    }
});