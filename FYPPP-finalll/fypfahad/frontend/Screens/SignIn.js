import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,ActivityIndicator, TextInput, Animated, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const images = [
  require('../assets/2ndpage.jpg'),
  require('../assets/Capture.jpg'),
  require('../assets/Capture-2.jpg'),
];

const SignIn = () => {
  const navigation = useNavigation();
  const [imageIndex, setImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const fadeAnim = new Animated.Value(1);

  const validationSchema = Yup.object().shape({
    emailAddress: Yup.string()
      .email('Invalid email')
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const changeImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // useEffect(() => {
  //   checkUser();
  // });

  // const checkUser = async () => {
  //   const getUser = await AsyncStorage.getItem('currentuser');
  //   if (getUser !== null) {
  //     navigation.navigate('HomePage');
  //   }
  // };

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

  const handleSignIn = async (values,resetForm) => {
    try {
      setLoading(true)
      const URL = 'http://192.168.3.102:8080/api/v1/auth/user/login';

      console.log('Request Data:', values);

      const response = await axios.post(URL, values);
      if (response && response.status === 200) {
        resetForm()
        const rows = response.data;
        console.log(rows,'after login')
        await AsyncStorage.setItem('token', rows?.data?.authToken);
        await AsyncStorage.setItem('currentuser', JSON.stringify(rows?.data?.user));

        const role = rows?.data?.user?.role;
   
        if (role === 'ADMIN') {
          setLoading(false);
          navigation.navigate('AdminAnimal');
        } else {
          setLoading(false);
          navigation.navigate('HomePage');
        }
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      setLoading(false);
      // resetForm();
      if (error.response) {
        Alert.alert(error.response.data.message)
        // console.error('Error response message:',  error.response.data.message);
      }else {
        console.error('Error:', error.message);
        Alert.alert(error.message)
      }
    }
  };

  return (
    <Formik
      initialValues={{ emailAddress: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting,resetForm }) => {
        handleSignIn(values,resetForm);
        setSubmitting(false);
        
      }}
    >
      {({ values, handleChange, handleSubmit, errors, touched }) => (


        <View style={styles.container}>
          <Animated.Image
            source={images[imageIndex]}
            style={{ ...styles.image, opacity: fadeAnim }}
            resizeMode="cover"
          />
          <View style={styles.loginBox}>
            <Text style={styles.helloText}>Hello!</Text>
            <Text style={styles.subText}>Sign In Your Account</Text>
            <View style={styles.inputContainer}>
              <Image source={require('../assets/email.png')} style={styles.icon} />

              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#000"
                onChangeText={handleChange('emailAddress')}
                value={values.emailAddress}
              />
            
            </View>
            {errors.emailAddress && touched.emailAddress && (
                <Text style={styles.error}>{errors.emailAddress}</Text>
              )}
            <View style={styles.inputContainer}>
              <Image source={require('../assets/padlock.png')} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry
                placeholderTextColor="#000"
                onChangeText={handleChange('password')}
                value={values.password}
              />
            
            </View>
            {errors.password && touched.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            <TouchableOpacity activeOpacity={0.9}
              style={styles.forgotPassword}
              onPress={() => navigation.navigate('PasswordReset')}
            >
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signInButton} onPress={handleSubmit} activeOpacity={0.9}>
              <Text style={styles.buttonText}>{loading ? (
              <ActivityIndicator animating={true} color="#fff" />
            ) : 'Sign In'}</Text>
            </TouchableOpacity>
            <View style={styles.createAccount}>
              <Text style={styles.createAccountText}>Don't have an account? </Text>
              <Text style={styles.createLinkText} onPress={() => navigation.navigate('SignUp')}>
                Create
              </Text>
            </View>
          </View>
        </View>
      )}
    </Formik>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e0f0fa',
    borderRadius: 25,
    elevation: 5,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
    borderRadius: 60,
  },
  loginBox: {
    padding: 20,
    borderRadius: 20,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white background
    borderWidth: 1,
    borderColor: '#3498db', // Border color
  },
  helloText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3498db',
    textAlign: 'center',
  },
  subText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#3498db',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#000',
    padding: 0,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: '#e74c3c',
    textDecorationLine: 'underline',
  },
  signInButton: {
    backgroundColor: '#95adbe', //'#73b6e2', //#2ecc71
    padding: 15,
    borderRadius: 25,
    marginBottom: 10,
    marginTop: 25,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  createAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
  },
  createAccountText: {
    color: '#3498db',
  },
  createLinkText: {
    color: '#e74c3c',
    marginLeft: 5,
  },
  error: {
    fontSize: 11,
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 8,
    marginLeft: 6,
  }
});

export default SignIn;