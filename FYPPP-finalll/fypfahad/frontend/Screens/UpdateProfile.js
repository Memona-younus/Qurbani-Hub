import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';

const UpdateProfile = ({ navigation, route }) => {

  const [loading, setLoading] = useState(false);
  const user =route?.params?.user
  const validationSchema = yup.object().shape({
    fullName: yup.string().required('This field is required'),
    emailAddress: yup.string()
      .email('Invalid email')
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Invalid email').required('Email is required'),
    phoneNo: yup.string().matches(/^[0-9]{11}$/, 'Invylid phone number').required('This field is required')
  });
  const handleUpdate = async (values) => {
    setLoading(true)
    try {
      const temp = await AsyncStorage.getItem('token')

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${temp}`
        }
      };
      const response = await axios.put(`http://192.168.3.102:8080/api/v1/user/update-profile`, values, config);
      const response1 = await axios.get(`http://192.168.3.102:8080/api/v1/user/get-profile`,config);
      console.log('response1---------------->>>',response1?.data)
      if (response?.data?.success) {
          await AsyncStorage.setItem('currentuser', JSON.stringify(response?.data?.data));
        setLoading(false)

        navigation.navigate('HomePage');
      }
    } catch (error) {
      setLoading(false);
      // resetForm();
      if (error.response) {
        setLoading(false)
          console.log('Error response message:', error.response.data.message);
          Alert.alert(error.response.data.message)
      } else {
        console.error('Error:', error.message);
        // Alert.alert(error.message)
      }
    }
  };

  return (
    <Formik
      initialValues={{ fullName: user?.fullName || '', emailAddress: user?.emailAddress || '', phoneNo: user?.phoneNo || '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting,resetForm }) => {
        handleUpdate(values,resetForm);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleSubmit, errors, touched }) => {
        return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={values?.fullName}
          onChangeText={handleChange('fullName')}
          placeholder="Enter your full name"
          placeholderTextColor="#000"
        />
      </View>
          {touched.fullName && errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={values?.emailAddress}
          onChangeText={handleChange('emailAddress')}
          placeholder="Enter your email"
          placeholderTextColor="#000"
        />
      </View>
        {touched.emailAddress && errors.emailAddress && <Text style={styles.error}>{errors.emailAddress}</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={values?.phoneNo}
          onChangeText={handleChange('phoneNo')}
          placeholder="Enter your phone number"
          placeholderTextColor="#000"
        />
      </View>
         {touched.phoneNo && errors.phoneNo && <Text style={styles.error}>{errors.phoneNo}</Text>}

   

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
               <Text style={styles.buttonText}>{loading ? <ActivityIndicator size={30} color="#fff" /> : 'Update'}</Text>
      </TouchableOpacity>
    </View>
      )
    }}
  </Formik>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    // backgroundColor: '#e0f0fa',
  },
  image: {
    width: 130,
    height: 130,
    marginBottom: 20,
    borderRadius: 30,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 4,
    marginTop: 10,
    borderColor: '#2084c7',
    borderWidth: 1,
    borderRadius: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft:10,
    color:'grey'
  },
  button: {
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

export default UpdateProfile;
