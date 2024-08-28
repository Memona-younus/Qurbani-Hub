import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Animated, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const images = [
  require('../assets/2ndpage.jpg'),
  require('../assets/Capture.jpg'),
  require('../assets/Capture-2.jpg'),
];

const SignUp = ({ navigation }) => {

  const [imageIndex, setImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const fadeAnim = new Animated.Value(1);

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
  }, []);

  const Sendtobackend = (values,resetForm) => {
    console.log('Sendtobackend function is called', values);
    setLoading(true);
    const formdata = { ...values, role: 'USER' };
  
    axios.post('http://192.168.3.102:8080/api/v1/auth/user/register-user', formdata)
      .then(response => {
        console.log(response.data);
        resetForm()
        navigation.navigate('SignIn');
      })
      .catch(error => {
        setLoading(false);
        if (error.response) {
          Alert.alert(`${error.response.data.message}`)
        } else {
          Alert.alert(error.message)
          console.log('Error:', error.message);
        }
      });
  };
  

  const validationSchema = yup.object().shape({
    fullName: yup.string().required('This field is required'),
    emailAddress: yup.string()
      .email('Invalid email')
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Invalid email').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    phoneNo: yup.string().matches(/^[0-9]{11}$/, 'Invalid phone number').required('This field is required')
  });

  return (
    <Formik
      initialValues={{ fullName: '', emailAddress: '', password: '', confirmPassword: '', phoneNo: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting,resetForm }) => {
        Sendtobackend(values,resetForm);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleSubmit, errors, touched }) => {
        console.log(errors, 'error------->>>')
        return (
            <View style={styles.container}>
              <Animated.Image
                source={images[imageIndex]}
                style={{ ...styles.image, opacity: fadeAnim }}
                resizeMode="cover"
              />
              <View style={styles.SignUpBox}>
                <Text style={styles.helloText}>Create Account</Text>
                <View style={styles.inputContainer}>
                  <Image source={require('../assets/user.png')} style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#000"
                    onChangeText={handleChange('fullName')}
                    value={values.fullName}
                  />
                </View>
                {errors.fullName && touched.fullName && (
                  <Text style={styles.error}>{errors.fullName}</Text>
                )}
                <View style={styles.inputContainer}>
                  <Image source={require('../assets/user.png')} style={styles.icon} />
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
                  <Image source={require('../assets/contact-us.png')} style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your phone number"
                    placeholderTextColor="#000"
                    onChangeText={handleChange('phoneNo')}
                    value={values.phoneNo}
                  />
                </View>
                {errors.phoneNo && touched.phoneNo && (
                  <Text style={styles.error}>{errors.phoneNo}</Text>
                )}

                <View style={styles.inputContainer}>
                  <Image source={require('../assets/padlock.png')} style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="#000"
                    onChangeText={handleChange('password')}
                    value={values.password}
                  />
                </View>
                {errors.password && touched.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}

                <View style={styles.inputContainer}>
                  <Image source={require('../assets/security.png')} style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    placeholderTextColor="#000"
                    onChangeText={handleChange('confirmPassword')}
                    value={values.confirmPassword}
                  />
                </View>
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={styles.error}>{errors.confirmPassword}</Text>
                )}

                <TouchableOpacity style={styles.CreateAccButton} onPress={handleSubmit} activeOpacity={0.9}>
                  <Text style={styles.buttonText}>{loading ? (
              <ActivityIndicator animating={true} color="#fff" />
            ) : 'Create Account'}</Text>
                </TouchableOpacity>
                <View style={styles.createAccount}>
                  <Text>Have an Account? </Text>
                  <Text style={styles.createLinkText} onPress={() => navigation.navigate('SignIn')}>SignIn</Text>
                </View>
              </View>
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
    padding: 20,
    backgroundColor: '#e0f0fa', // Lighter shade of blue
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
    borderRadius: 60,
  },
  SignUpBox: {
    padding: 15,
    borderRadius: 20,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent blueish background
    borderWidth: 1,
    borderColor: '#3498db', // Border color
  },
  helloText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#3498db',
    textAlign: 'center',
  },
  subText: {
    fontSize: 18,
    fontWeight: 'light-bold',
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
  // forgotPassword: {
  //   alignSelf: 'flex-end',
  //   marginBottom: 10,
  // },
  // forgotPasswordText: {
  //   color: '#e74c3c',
  //   textDecorationLine: 'underline',
  // },
  CreateAccButton: {
    backgroundColor: '#95adbe',
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
    marginTop: 5,
    justifyContent: 'center',
  },
  createLinkText: {
    color: '#3498db',
  },
  error: {
    fontSize: 11,
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginTop: 0,
    paddingTop: 0,
    marginLeft: 6,
  }
});

export default SignUp;