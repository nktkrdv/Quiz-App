import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import HomeScreen from './screens/home';
import Quiz from './screens/quiz';
import Result from './screens/result';
import { createStackNavigator,CardStyleInterpolators,CommonActions } from '@react-navigation/stack';
import Categories from './screens/categories';
import { LogBox } from "react-native";
import { AuthScreen } from './screens/auth';
import History from './screens/history';
import ShowDetails from './screens/showDetails';
import LeaderBoard from './screens/leaderBoard';

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

function App() {
  const Stack = createStackNavigator();
function MyStack() {
  return (
<Stack.Navigator screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid, 
    }}>
      <Stack.Screen options={{ animationTypeForReplace:'pop', headerShown:false}} name="Auth" component={AuthScreen}/>
      <Stack.Screen options={{headerShown:false}} name="ShowDetails" component={ShowDetails}/>
      <Stack.Screen options={{headerShown:false}} name="LeaderBoard" component={LeaderBoard}/>
      <Stack.Screen options={{  animationTypeForReplace:'pop', headerShown:false}} name="Home" component={HomeScreen}  />
      <Stack.Screen options={{headerShown:false}} name="History" component={History}/>
      <Stack.Screen options={{headerShown:false}} name="Quiz" component = {Quiz} />
      <Stack.Screen options={{headerShown:false}} name="Result" component={Result} />
      <Stack.Screen options={{  headerShown:false}} name="Categories" component={Categories}/>
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