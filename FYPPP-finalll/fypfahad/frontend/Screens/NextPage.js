
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const NextPage = ({ route }) => {
  const navigation = useNavigation();

  const { selectedDate, selectedSlot } = route.params || {};

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [additionalAnimalTypes, setAdditionalAnimalTypes] = useState([]);
  const [animalQuantities, setAnimalQuantities] = useState({});
  const [animalQuantity, setAnimalQuantity] = useState('');
  const [butcherOption, setButcherOption] = useState('');
  const [price, setPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const calculatePrice = () => {
    if (
      name &&
      phone &&
      (animalType || additionalAnimalTypes.length > 0) &&
      (animalQuantity || Object.values(animalQuantities).some(Boolean)) &&
      butcherOption
    ) {
      let animalPrice = 0;

      const allAnimalTypes = [animalType, ...additionalAnimalTypes];

      allAnimalTypes.forEach((type) => {
        const quantity = type === animalType ? animalQuantity : animalQuantities[type];
        if (type.toLowerCase() === 'cow') {
          animalPrice += butcherOption === 'userButcher' ? 2000 * quantity : 12000 * quantity;
        } else if (type.toLowerCase() === 'goat' || type.toLowerCase() === 'sheep') {
          animalPrice += butcherOption === 'userButcher' ? 1000 * quantity : 10000 * quantity;
        }
      });

      setPrice(animalPrice);
    } else {
      setPrice(0);
    }
  };

  useEffect(() => {
    calculatePrice();
  }, [name, phone, animalType, additionalAnimalTypes, animalQuantity, animalQuantities, butcherOption]);

  const handleAddAnimalType = () => {
    if (animalType) {
      setAdditionalAnimalTypes([...additionalAnimalTypes, animalType]);
      setAnimalQuantities({
        ...animalQuantities,
        [animalType]: '', // Initialize quantity for the new animal type
      });
      setAnimalType('');
    }
  };

  const handleQuantityChange = (type, quantity) => {
    setAnimalQuantities({
      ...animalQuantities,
      [type]: quantity,
    });
  };

  const renderQuantityInput = (type) => {
    return (
      <View style={styles.quantityContainer}>
        <TextInput
          style={styles.inputWithPicker}
          placeholder={`How Many ${type} You Want To Slaughter?`}
          value={animalQuantities[type]}
          onChangeText={(text) => handleQuantityChange(type, text)}
          keyboardType="numeric"
        />
      </View>
    );
  };

  const handleSubmission = () => {
    if (
      name &&
      phone &&
      (animalType || additionalAnimalTypes.length > 0) &&
      (animalQuantity || Object.values(animalQuantities).some(Boolean)) &&
      butcherOption
    ) {
      setSuccessMessage('Your slot has been successfully booked.');
      setErrorMessage('');
      setModalVisible(true);
    } else {
      setErrorMessage('All fields are required, including the butcher option.');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate('HomePage');
  };

  return (
    <View style={styles.container}>
      {/* Back arrow */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../assets/back-arrow.png')} style={styles.backArrow} />
      </TouchableOpacity>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>CONFIRM SLOT</Text>
        {/* Add the image to the right of the heading */}
        <Animatable.Image
          animation="pulse"  // You can use other animations provided by react-native-animatable
          iterationCount="infinite"
          source={require('../assets/online-booking.png')}
          style={styles.headingImage}
        />
      </View>
      <Text>Date: {selectedDate}</Text>
      <Text>Slot Time: {selectedSlot.time}</Text>
      <View style={{ marginVertical: 10 }} />

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        keyboardType="numeric"
      />
      <View style={styles.inputContainer}>
        <View style={styles.animalTypeContainer}>
          <TextInput
            style={styles.inputAnimalType}
            placeholder="Animal Type"
            value={animalType}
            onChangeText={(text) => setAnimalType(text)}
          />
        </View>
        <TouchableOpacity onPress={handleAddAnimalType} style={styles.addButton}>
          <Text style={styles.addButtonLabel}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Display additional animal types */}
      <Text style={styles.animals}>{additionalAnimalTypes.join(', ')}</Text>

      {additionalAnimalTypes.map((type) => (
        <View key={type}>
          {/* <Text>{type}</Text> */}
          {renderQuantityInput(type)}
        </View>
      ))}

      {/* <TextInput
        style={styles.input}
        placeholder="Animal Quantity"
        value={animalQuantity}
        onChangeText={(text) => setAnimalQuantity(text)}
        keyboardType="numeric"
      /> */}

      <View style={{ marginVertical: 3 }} />

      <Text style={styles.label2}>Select Butcher Option:</Text>
      <Picker
        selectedValue={butcherOption}
        onValueChange={(itemValue) => setButcherOption(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Choose Butcher Option" value="" />
        <Picker.Item label="Bring Own Butcher" value="userButcher" />
        <Picker.Item label="Use Slaughterhouse Butcher" value="slaughterhouseButcher" />
      </Picker>

      <Text style={styles.label}>Your Total Amount = Rs. {price}</Text>

      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmission}>
        <Text style={styles.submitButtonText}>Done</Text>
      </TouchableOpacity>

      {/* Modal for displaying the success message */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Success!</Text>
            <Text>Your slot has been successfully booked.</Text>
            <Text style={styles.slotDetails}>
              Mark your calendar:
              {'\n'}Date: {selectedDate}
              {'\n'}Slot Time: {selectedSlot.time}
            </Text>
            <TouchableOpacity style={styles.okButton} onPress={closeModal}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f0fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 33,
    fontWeight: 'bold',
    marginBottom: -37,
    color: '#2084c7',
    marginLeft: 10,
  },
  input: {
    height: 40,
    width: '80%',
    marginBottom: 10,
    paddingLeft: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
  submitButton: {
    borderWidth: 3,
    borderColor: "#3498db",
    padding: 2,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 8,
    backgroundColor: '#7FB8E3',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 18,
    marginBottom: -3,
    color: '#2084c7',
  },
  label2: {
    fontSize: 16,
    marginBottom: -10,
    color: '#2084c7',
  },
  picker: {
    height: 40,
    width: '74%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: -3,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  successMessage: {
    color: 'green',
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  successBox: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#dff0d8', // Background color of the success box
    padding: 10,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2084c7',
  },
  slotDetails: {
    marginTop: 10,
  },
  okButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#7FB8E3',
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  okButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    right: 40,
    // top: -14,
    bottom: -8,
    // borderWidth: 1,
    // borderColor: '#3498db',
    borderRadius: 5,
    padding: 10,
  },
  addButtonLabel: {
    color: '#3498db',
    fontSize: 40,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAnimalType: {
    height: 40,
    width: '81.5%',
    marginBottom: 4,
    paddingLeft: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 36,

  },
  animalTypeContainer: {
    flex: 1,
    marginRight: 5,
  },
  animals: {
    marginBottom: 10,
    marginTop: 4,
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputWithPicker: {
    height: 40,
    width: '86.5%',
    marginBottom: 4,
    paddingLeft: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 24,

  },
  numberPicker: {
    height: 20,
    width: '20%',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    borderColor: 'gray',
    borderWidth: 1,
  },
  pickerItem: {
    fontSize: 14, // Adjust the font size as needed
    color: 'black', // Adjust the color as needed
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headingImage: {
    width: 90,
    height: 90,
    marginLeft: -2,
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
});

export default NextPage;