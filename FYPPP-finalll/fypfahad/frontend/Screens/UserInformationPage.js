import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

// Initialize geocoding with your API key
Geocoder.init('AIzaSyAAPPNIhaQ5QmfM4VPey7YutulvIitbMfo');

const UserInformationPage = () => {
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [cnicNumber, setCnicNumber] = useState(''); // New state for CNIC number
  const [meatDistributionOption, setMeatDistributionOption] = useState('');
  const [donationDestination, setDonationDestination] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: 24.8607,
    longitude: 67.0011,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleSubmit = () => {
    // Send data to backend API for processing
    // Consider using a state management library like Redux for a more complex application
    // API call to save user information and preferences
  };

  const handleOptionSelect = (option) => {
    setMeatDistributionOption(option);
    setModalVisible(false);
  };

  const handleMapRegionChange = (region) => {
    setMapRegion(region);
  };

  const handleDestinationChange = async () => {
    try {
      const response = await Geocoder.from(donationDestination);
      const { lat, lng } = response.results[0].geometry.location;

      setMapRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Semi-circle at the top */}
        <View style={styles.semiCircle}>
          <Text style={styles.title}>PROVIDE YOUR INFORMATION</Text>
        </View>
        {/* User image */}
        <Image
          source={require('../assets/user-icon.png')} // Replace with the path to the user's image
          style={styles.userImage}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={(text) => setContactNumber(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="CNIC Number"
        value={cnicNumber}
        onChangeText={(text) => setCnicNumber(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={styles.pickerContainer}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.input}>
          {meatDistributionOption || 'Meat Distribution Preference:'}
        </Text>
      </TouchableOpacity>

      {meatDistributionOption === 'Specify donation destinations' && (
        <>
          <MapView
            style={styles.map}
            region={mapRegion}
            onRegionChangeComplete={handleMapRegionChange}
          >
            <Marker
              coordinate={{
                latitude: mapRegion.latitude,
                longitude: mapRegion.longitude,
              }}
            />
          </MapView>
          <View style={styles.inputContainer}>
            <View style={styles.inputWithButton}>
              <TextInput
                style={styles.inputWithSearch}
                placeholder="Enter preferred donation destination"
                value={donationDestination}
                onChangeText={(text) => setDonationDestination(text)}
              />
              <TouchableOpacity
                style={styles.searchButton}
                onPress={handleDestinationChange}
              >
                <Text style={{fontWeight: 'bold', color: 'white'}}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleOptionSelect('Distribute on my behalf')}
            >
              <Text>Distribute on my behalf</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleOptionSelect('Specify donation destinations')}
            >
              <Text>Specify donation destinations</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => setModalVisible(false)}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.submitButtonContainer}>
        <Button title="Submit" onPress={handleSubmit} color="#7FB8E3" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f0fa',
    padding: 20,
  },
  header: {
    position: 'relative',
    alignItems: 'center',
  },
  semiCircle: {
    width: 400,
    height: 160,
    backgroundColor: '#7FB8E3',
    borderBottomLeftRadius: 195,
    borderBottomRightRadius: 195,
    position: 'absolute',
    top: -260,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    width: 90,
    height: 90,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#fff',
    marginTop: -150,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    marginTop: 25,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  inputWithSearch: {
    height: 40,
    width: '100%', // Adjust this based on your design
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  selectedOption: {
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    textAlign: 'left',
  },
  map: {
    height: 200,
    width: '100%',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchButton: {
    position: 'absolute',
    right: 0,
    top: -0.25, 
    padding: 10.5,
    backgroundColor: '#95adbe',
    borderRadius: 4,
    fontSize: 18,
  },
  submitButtonContainer: {
    marginTop: 20, 
    width: 90,
    height: 50,
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default UserInformationPage;
