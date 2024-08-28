import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleVerifyCode = () => {
    // Handle verification code verification
    console.log('Verification code:', verificationCode);
  };

  const handleResetPassword = async () => {
    // Handle resetting the password
    console.log('New Password:', newPassword);
    console.log('Confirmed New Password:', confirmNewPassword);
    try {

      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      };
      const response = await axios.post(`http://192.168.3.102:8080/api/v1/user/forgot-password`, { email }, config);
      console.log('response1---------------->>>', response?.data)
      if (response?.data?.success) {
        Alert.alert('otp sent')
      }
    } catch (error) {
      // setLoading(false);
      // resetForm();
      if (error.response) {
        // setLoading(false)
        console.log('Error response message:', error.response.data.message);
        Alert.alert(error.response.data.message)
      } else {
        console.error('Error:', error.message);
        // Alert.alert(error.message)
      }
    }
  };

  return (
    <View style={styles.container}>
      {<Image
        source={require('../assets/reset.png')}
        style={styles.image}
        resizeMode="cover"
      />}
      <Text style={styles.heading}>Reset Password</Text>

      <View style={styles.inputContainer}>
        <Image source={require('../assets/email.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          placeholderTextColor="#000"
        />
      </View>

      <View style={styles.inputContainer}>
        <Image source={require('../assets/otp.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          value={verificationCode}
          onChangeText={(text) => setVerificationCode(text)}
          placeholder="Verification Code"
          placeholderTextColor="#000"
        />
      </View>

      <View style={styles.inputContainer}>
        <Image source={require('../assets/padlock.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          placeholder="New Password"
          placeholderTextColor="#000"
          secureTextEntry
        />
      </View>

      <View style={styles.inputContainer}>
        <Image source={require('../assets/security.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          value={confirmNewPassword}
          onChangeText={(text) => setConfirmNewPassword(text)}
          placeholder="Confirm New Password"
          placeholderTextColor="#000"
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e0f0fa',
  },
  image: {
    width: 130,
    height: 130,
    marginBottom: 20,
    borderRadius: 30,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 8,
    marginBottom: 15,
    borderColor: 'black',
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
  },
  button: {
    backgroundColor: '#6495ED',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default PasswordReset;
