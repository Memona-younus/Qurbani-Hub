// PaymentPage.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const PaymentPage = ({ navigation }) => {
    const [bankAccountNumber, setBankAccountNumber] = useState('');

    const handlePayment = () => {
        // Implement your payment logic here
        // For simplicity, let's just navigate back to the previous screen after "payment"
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Payment Details</Text>
            <TextInput
                style={styles.input}
                placeholder="Bank Account Number"
                value={bankAccountNumber}
                onChangeText={(text) => setBankAccountNumber(text)}
            />
            <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
                <Text style={styles.payButtonText}>Pay Now</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0f0fa',
        padding: 20,
        justifyContent: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
    payButton: {
        backgroundColor: '#7FB8E3',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    payButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PaymentPage;
