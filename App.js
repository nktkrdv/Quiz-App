import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import HomeScreen from './screens/HomeScreen';
// import MainContainer from './screens/MainContainer';
import Quiz from './screens/Quiz';
import Result from './screens/Result';
import { createStackNavigator } from '@react-navigation/stack';
import Responses from './screens/Responses';
import App1 from './screens/Timer';
import { LogBox } from "react-native";
import { AuthScreen } from './screens/auth';
import { CloudFirestoreScreen } from './screens/cloudFirestore';
import History from './screens/History';
import { firebase } from '@react-native-firebase/auth';
import ShowDetails from './screens/ShowDetails';

LogBox.ignoreLogs(["EventEmitter.removeListener"]);


function App() {
  const Stack = createStackNavigator();
function MyStack() {
  return (
<Stack.Navigator >

      <Stack.Screen options={{headerShown:false}} name="Auth" component={AuthScreen}/>
      <Stack.Screen options={{headerShown:false}} name="ShowDetails" component={ShowDetails}/>
      <Stack.Screen options={{headerShown:false}} name="Home" component={HomeScreen}  />
      <Stack.Screen options={{headerShown:false}} name="History" component={History}/>
      <Stack.Screen options={{headerShown:false}} name="Firestore" component={CloudFirestoreScreen}/>
      <Stack.Screen options={{headerShown:false}} name="Quiz" component = {Quiz} />
      <Stack.Screen options={{headerShown:false}} name="Result" component={Result} />
      <Stack.Screen options={{headerShown:false}} name="Responses" component={Responses}/>
      <Stack.Screen options={{headerShown:false}} name="StopWatch" component={App1}/>
    </Stack.Navigator>
    
  );
}
  return (
    <NavigationContainer theme={{colors:{background:'#000'}}}>
      <MyStack/> 
    </NavigationContainer>
  );
}

export default App;