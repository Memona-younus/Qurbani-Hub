import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';

const My_Slots = ({ route, navigation }) => {
  const { selectedDate, selectedSlot, animalType, animalQuantity, butcherOption, price } = route.params || {};

  // Check if selectedSlot is defined
  const slotTime = selectedSlot ? selectedSlot.time : '';

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/SHH3.jpg')} style={styles.background}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/back-arrow.png')} style={styles.backArrow} />
        </TouchableOpacity>
        <View style={styles.content}>
          <View style={styles.detailsContainer}>
            <Text style={styles.heading}>YOU HAVE BOOKED YOUR SLOT FOR:</Text>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Date:</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.input}>{selectedDate}</Text>
              </View>
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Slot Time:</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.input}>{slotTime}</Text>
              </View>
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Animal Type:</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.input}>{animalType}</Text>
              </View>
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Animal Quantity:</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.input}>{animalQuantity}</Text>
              </View>
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Butcher Option:</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.input}>{butcherOption}</Text>
              </View>
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Total Amount:</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.input}>Rs. {price}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: '#e0f0fa',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  backArrow: {
    width: 40,
    height: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.78)',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  inputContainer: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
    paddingBottom: 3,
  },
  input: {
    fontSize: 18,
    color: '#333',
  },
});

export default My_Slots;
