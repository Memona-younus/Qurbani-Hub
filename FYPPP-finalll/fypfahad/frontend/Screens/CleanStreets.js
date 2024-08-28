import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import SlotSelectionScreen from '../Screens/SlotSelectionScreen'; // Import the new screen component

const images = [
  require('../assets/SlaughterHouse.jpg'),
  require('../assets/SH2.jpg'),
  require('../assets/SHH3.jpg'),
];

const CleanStreets = () => {
  const navigation = useNavigation();
  const [imageIndex, setImageIndex] = useState(0);
  const fadeAnim = new Animated.Value(1);
  const [availableSlots, setAvailableSlots] = useState([
    { id: 1, day: 'Monday', date: '2023-11-27', time: '10:00 AM' },
    { id: 2, day: 'Wednesday', date: '2023-11-29', time: '2:00 PM' },
    // Add more slots as needed
  ]);

  const changeImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

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

  const handleBookSlotPress = () => {
    // Navigate to the SlotSelectionScreen and pass the available slots
    navigation.navigate('SlotSelectionScreen', { availableSlots: availableSlots });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perform Qurbani At Our Specialized Slaughterhouse</Text>
      <Animated.Image
        source={images[imageIndex]}
        style={{ ...styles.image, opacity: fadeAnim }}
        resizeMode="cover"
      />
      <TouchableOpacity style={styles.button} onPress={handleBookSlotPress}>
        <Text style={styles.buttonText}>Book Slot</Text>
      </TouchableOpacity>
      <Text style={styles.note}>Note: This facility is only for the residents of Karachi-Pakistan</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0f0fa'
  },
  image: {
    width: '90%', // Adjust the width as needed
    height: 200,   // Adjust the height as needed
    marginBottom: 20,
    resizeMode: 'cover', // or 'contain' as per your requirement
    borderRadius: 8,
  },
  title: {
    fontSize: 27, // Increase the font size as needed
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center', // Center the text within the container
    color:  '#2084c7', // Change the color as needed
  },
  button: {
    borderWidth: 3,
    borderColor: "#3498db",
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#7FB8E3',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  note: {
    marginTop: 22,
    // fontStyle: 'italic',
    color: 'gray',
    fontSize: 13,
    fontWeight: 'bold'
  },
});

export default CleanStreets;

