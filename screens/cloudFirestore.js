import * as React from 'react';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';


import {firebase} from '../Setup';
import {firestore} from '../Setup';
import {Auth} from '../Setup';

import { View ,Text,StyleSheet} from 'react-native';
export const CloudFirestoreScreen = ({navigation}) => {
    const user = firebase.auth().currentUser;

if (user) {
 console.log('User email: ', user.uid);
}
  const usersCollectionRef = firestore().collection('Users');

  const adduser = () => {
    usersCollectionRef.add({
      Name: 'Harry',
      Location: new firestore.GeoPoint(53.483959, -2.244644),
      age: 28,
      dateAdded: firestore.FieldValue.serverTimestamp(),
    });
  };
  const deleteData = () => {
    usersCollectionRef
      .doc('12345')
      .delete()
      .then(() => {})
      .catch(() => {});
  };

  const fetchData = () => {
    usersCollectionRef.get().then((snapshot) => {
      snapshot.forEach((documentSnapshot) => {
        console.log(documentSnapshot.data());
      });
    });
  };
  React.useEffect(() => {
    usersCollectionRef.onSnapshot((documentSnapshot) => {
      console.log(documentSnapshot.size);
    });
  }, []);
  return (
    <View>
        <View>
            <Text style={styles.text} onPress={adduser}>Save Data</Text>
        </View>
        <View>
            <Text style={styles.text} onPress={deleteData}>Delete Data</Text>
        </View>
        <View>
            <Text onPress={fetchData} style = {styles.text}>Fetch data</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    text:{
        fontSize:30,
        color:'#fff',
        margin:20,
    }
})