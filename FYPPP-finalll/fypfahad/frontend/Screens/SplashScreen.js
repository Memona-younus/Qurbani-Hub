import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
 checkUser();
  });

  const checkUser = async () => {
    // await AsyncStorage.clear();
    const user = await AsyncStorage.getItem('currentuser');
    const getUser = JSON.parse(user);
  
    if (getUser?.user !== undefined) {
      if (getUser?.user?.role === "USER") {
        console.log('user');
        navigation.navigate('HomePage');
      } else {
        console.log('admin');
        navigation.navigate('AdminAnimal');
      }
    } else {
      setTimeout(() => {
        navigation.navigate('SignIn');
      }, 2000);
    }
  };
  
 useEffect(() => {
  checkUser();
 });


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Qurbani Hub</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Customize the background color
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black', // Customize the text color
  },
});

export default SplashScreen;