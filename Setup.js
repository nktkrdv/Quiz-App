import { View, Text } from 'react-native'
import React from 'react'
import App from './App'
import firebase from '@react-native-firebase/app'
import Auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import firestore from '@react-native-firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9Ga_kBFBntZ5wtC9Rq8FM5YGDyuLULqg",
  authDomain: "quizapp-6713d.firebaseapp.com",
  projectId: "quizapp-6713d",
  databaseURL:"https://quizapp-6713d-default-rtdb.firebaseio.com/",
  storageBucket: "quizapp-6713d.appspot.com",
  messagingSenderId: "980757259557",
  appId: "1:980757259557:web:72b93e1cafecf7d93e66cc",
  measurementId: "G-EJNHCH2NL3"
};


if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
export {Auth,firebase,database,firestore};

function Setup() {
  return <App/>;
}



export default Setup