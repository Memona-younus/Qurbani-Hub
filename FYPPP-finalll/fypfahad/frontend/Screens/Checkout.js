import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const Checkout = ({ adminBankDetails, onPayment }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handlePayment = () => {
    const paymentDetails = {
      amount,
      paymentMethod,
      name,
      address,
      contactNumber,
      adminBankDetails,
    };
    if (typeof onPayment === 'function') {
      onPayment(paymentDetails);
      Alert.alert('Success', 'ANIMAL SUCCESSFULLY PURCHASED!');
    } else {
      console.error('onPayment is not a function');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Payment Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Payment Method"
        value={paymentMethod}
        onChangeText={setPaymentMethod}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Delivery Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"
      />
      <View style={styles.bankDetailsContainer}>
        <Text style={styles.bankDetailsLabel}>Admin Bank Account Details:</Text>
        <Text>Account Title: Qurbani Hub</Text>
        <Text>Account No: QH123456789</Text>
        <Text>MEEZAN BANK KARACHI</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Pay Now" onPress={handlePayment} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  bankDetailsContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    marginBottom: 20,
  },
  bankDetailsLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
  },
});

export default Checkout;
