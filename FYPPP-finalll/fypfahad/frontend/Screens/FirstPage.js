import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView,TextInput, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const images = [
  require('../assets/2ndpage.jpg'),
  require('../assets/Capture.jpg'),
  require('../assets/Capture-2.jpg'),
];

const FirstPage = ({ navigation }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const fadeAnim = new Animated.Value(1);

  const changeImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  //   useEffect(() => {
  //     checkUser();
  //  });

  //  const checkUser = async () => {
  //    const getUser = await AsyncStorage.getItem('currentuser');
  //  };

  useEffect(() => {
    const intervalId = setInterval(changeImage, 3000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  }, [imageIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containe1}>
        <Text style={styles.heading}>QURBANI HUB</Text>
        <Animated.Image
          source={images[imageIndex]}
          style={{ ...styles.image, opacity: fadeAnim }}
          resizeMode="cover"
        />
        {/* <Text style={styles.text}> */}
        <Text style={styles.text}>The Best Qurbani App In Your Hands</Text>
        {/* </Text> */}
        <Text style={styles.subText}>
          Enjoy The Convenience And Efficiency Of Your Qurbani Through Our App. We
          Are Here To Make Your Experience Extraordinary.
        </Text>
        {/* <Text style={styles.getStartedText}>Get Started!</Text> */}
      </View>
      <View style={styles.container2}>
        {/* <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.btn}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.btnText}>Get Started!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  containe1: {
    height:'80%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    height:'20%',
    // flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 7,
    textAlign: 'center',
    color: '#2084c7', // Change heading color to blue
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
    borderRadius: 60,
  },
  text: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#34495e',
    textAlign: 'center',
  },
  subText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    color: 'grey'
  },
  getStartedText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2084c7',
  },

  btn: {
    paddingVertical: 14,
    padding: 10,
    backgroundColor: '#2084c7',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    width: 290,
    // marginBottom: 10,
    elevation: 4,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});


export default FirstPage;