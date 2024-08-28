import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, FlatList } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as yup from 'yup';

const EditAnimal = ({ navigation, route }) => {

  const { animal } = route?.params;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(animal?.animalType);
  const [items, setItems] = useState([
    { label: 'Cow', value: 'COW' },
    { label: 'Camel', value: 'CAMEL' },
    { label: 'Sheep', value: 'SHEEP' },
    { label: 'Goat', value: 'GOAT' },
  ]);

  const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    price: yup.number().required('Price is required').positive('Price must be positive'),
    totalTeeth: yup.number().required('Total Teeth is required').positive('Total Teeth must be positive'),
    weight: yup.number().required('Weight is required').positive('Weight must be positive'),
    breed: yup.string().required('Breed is required'),
    animalType: yup.string().required('Animal type is required'),
  });

  const initialValues = {
    title: animal?.title || '',
    description: animal?.description || '',
    price: animal?.price || '',
    totalTeeth: animal?.totalTeeth || '',
    weight: animal?.weight || '',
    breed: animal?.breed || '',
    animalType: animal?.animalType || '',
  };

  const handleUpdateAnimal = async (values) => {
    console.log(values, '----------------->>>>values')
    setLoading(true)
    try {
      const temp = await AsyncStorage.getItem('token')

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${temp}`
        }
      };
      const response = await axios.put(`http://192.168.3.102:8080/api/v1/animal/update-animal/${animal?._id}`, values, config);
      if (response?.data?.success) {
        setLoading(false)

        navigation.navigate('AdminAnimal');
      }
    } catch (error) {
      setLoading(false);
      // resetForm();
      if (error.response) {
        // Alert.alert(error.response.data.message)
        console.error('Error response message:', error.response.data.message);
      } else {
        console.error('Error:', error.message);
        // Alert.alert(error.message)
      }
    }
  };

  const inputFields = [
    { key: 'title', placeholder: 'Title' },
    { key: 'description', placeholder: 'Description' },
    { key: 'price', placeholder: 'Price', keyboardType: 'numeric' },
    { key: 'totalTeeth', placeholder: 'Total Teeth', keyboardType: 'numeric' },
    { key: 'weight', placeholder: 'Weight', keyboardType: 'numeric' },
    { key: 'breed', placeholder: 'Breed' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>EDIT ANIMAL INFO</Text>


      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleUpdateAnimal(values);
          setSubmitting(false);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
          <>
            <DropDownPicker
              style={[
                styles.dropDownPicker,
                touched.animalType && errors.animalType && { borderColor: 'red' }
              ]}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              onChangeValue={(selectedValue) => setFieldValue('animalType', selectedValue)}
            />
            {touched.animalType && errors.animalType && <Text style={styles.error}>{errors.animalType}</Text>}

            <FlatList
              data={inputFields}
              renderItem={({ item }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder={item.placeholder}
                    placeholderTextColor="#a2a2b5"
                    keyboardType={item.keyboardType}
                    onChangeText={handleChange(item.key)}
                    onBlur={handleBlur(item.key)}
                    value={values[item.key].toString()}
                  />
                  {touched[item.key] && errors[item.key] && <Text style={styles.error}>{errors[item.key]}</Text>}
                </View>
              )}
              keyExtractor={(item) => item.key}
            />


            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>{loading ? <ActivityIndicator size={30} color="#fff" /> : 'Update'}</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
      {/* <DropDownPicker
        style={{
          placeholderTextColor: '#a2a2b5',
          height: 48,
          borderColor: '#7FB8E3',
          color: '#a2a2b5',
          borderWidth: 1,
          padding: 10,
          marginTop: 2,
          marginBottom: 12,
          borderRadius: 12,
        }}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <FlatList
        data={inputFields}
        renderItem={({ item }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={item.placeholder}
              placeholderTextColor="#a2a2b5"
              keyboardType={item.keyboardType}
              value={formData[item.key].toString()}
              onChangeText={(text) => handleForm(item.key, text)}
            />
          </View>
        )}
        keyExtractor={(item) => item.key.toString()}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleUpdateAnimal}>
        <Text style={styles.buttonText}>{loading ?  <ActivityIndicator size={30} color="#fff" /> : 'Update'}</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  heading: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 35,
    color: '#2084c7',
  },
  inputContainer: {
    flexDirection: 'column',
    // alignItems: 'center',
    marginBottom: 5,
  },
  input: {
    flex: 1,
    height: 48,
    borderColor: '#7FB8E3',
    color: 'grey',
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
  },
  // addButton: {
  //   backgroundColor: '#7FB8E3',
  //   padding: 8,
  //   borderRadius: 999,
  //   alignItems: 'center',
  //   // marginTop: 20,
  //   marginBottom: 30,
  //   width: '100%',
  //   borderColor: '#2084c7',
  //   shadowColor: '#2084c7',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowRadius: 30,
  //   elevation: 8,
  //   shadowOpacity: 0.55,
  // },
  // buttonText: {
  //   color: '#fff',
  //   fontSize: 20,
  //   fontWeight: 'bold',
  // },
  addButton: {
    paddingHorizontal: 20,
    padding: 10,
    backgroundColor: '#2084c7',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginTop: 5,
    elevation: 5,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  dropDownPicker: {
    placeholderTextColor: '#a2a2b5',
    height: 48,
    borderColor: '#2084c7',
    // color: '#a2a2b5',
    color: 'grey',
    borderWidth: 1,
    padding: 10,
    marginTop: 2,
    marginBottom: 10,
    borderRadius: 12,
  },
  error: {
    fontSize: 11,
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginTop: 0,
    paddingTop: 0,
    marginLeft: 6,
  },
});

export default EditAnimal;
