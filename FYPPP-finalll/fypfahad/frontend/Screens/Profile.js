import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Animated, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const Profile = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState('')
    const checkUser = async () => {
        const user = await AsyncStorage.getItem('currentuser');
        const getUser = JSON.parse(user);
        setUser(getUser)

    };

    useEffect(() => {
        checkUser();
    }, []);
    console.log(user,'-------------->>>user')

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="arrow-back" size={24} style={styles.icon} onPress={() => navigation.goBack()} />
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff', marginTop: 12 }}>
                    Profile
                </Text>
                <View></View>
            </View>

            <View style={styles.loginBox}>

                <View style={styles.imgContainer}>
                    <Image source={require('../assets/download.png')} width={30} height={30} style={styles.image} />
                    <TouchableOpacity
              style={styles.Button}
              activeOpacity={0.8}
             onPress={()=>navigation.navigate('UpdateProfile',{user})}
            >
               <Text style={{ color: 'white', fontSize: 12,fontWeight:'bold',letterSpacing:1 }}>Update Profile</Text>
            </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.key}>Full Name</Text>
                    <Text style={styles.value}>{user?.fullName}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.key}>Email</Text>
                    <Text style={styles.value}>{user?.emailAddress}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.key}>Phone Number</Text>
                    <Text style={styles.value}>{user?.phoneNo}</Text>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0f0fa',
    },
    header: {
        paddingTop: 30,
        paddingBottom: 10,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#2084c7",
    },
    icon: {
        marginTop: 17,
        color: '#fff'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    imgContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    loginBox: {
        paddingHorizontal: 12,
        marginTop:40
    },
    inputContainer: {
        marginBottom: 10,
        borderColor:'lightgrey',
        borderBottomWidth:0.3    },
    key: {
        marginBottom: 1,
        color: 'grey',
    },
    value: {
        marginBottom: 3,
        color: '#555',
        fontSize: 16
    },
    Button: {
        backgroundColor: '#2084c7',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 6,
        paddingHorizontal:12,
        elevation:2,
        marginTop: 10,
    },


});

export default Profile;


// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
// import { Formik } from 'formik';
// import * as yup from 'yup'

// const UpdateProfile = ({ navigation, route }) => {

//   const [loading, setLoading] = useState(false);
//   const user =route?.params?.user
//   console.log(user,'------------>>>user')
//   const validationSchema = yup.object().shape({
//     fullName: yup.string().required('This field is required'),
//     emailAddress: yup.string()
//       .email('Invalid email')
//       .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Invalid email').required('Email is required'),
//     phoneNo: yup.string().matches(/^[0-9]{11}$/, 'Invylid phone number').required('This field is required')
//   });
//   const handleUpdate = async (values) => {
//     console.log(values, '----------------->>>>values')
//     setLoading(true)
//     try {
//       const temp = await AsyncStorage.getItem('currentuser')
//       const currentuser = JSON.parse(temp)
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${user?.authToken}`
//         }
//       };
//       const response = await axios.put(`http://172.16.187.83:8080/api/v1/user/update-profile`, values, config);
//       if (response?.data?.success) {
//         setLoading(false)

//         navigation.navigate('Profile');
//       }
//     } catch (error) {
//       setLoading(false);
//       // resetForm();
//       if (error.response) {
//         // Alert.alert(error.response.data.message)
//         console.error('Error response message:', error.response.data.message);
//       } else {
//         console.error('Error:', error.message);
//         // Alert.alert(error.message)
//       }
//     }
//   };
//   return (
//     <Formik
//       initialValues={{ fullName: user?.user?.fullName || '', emailAddress: user?.user?.emailAddress || '', phoneNo: user?.user?.phoneNo || '' }}
//       validationSchema={validationSchema}
//       onSubmit={(values, { setSubmitting,resetForm }) => {
//         handleUpdate(values,resetForm);
//         setSubmitting(false);
//       }}
//     >
//       {({ values, handleChange, handleSubmit, errors, touched }) => {
//         return (
//     <View style={styles.container}>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={values?.fullName}
//           onChangeText={handleChange('fullName')}
//           placeholder="Enter your full name"
//           placeholderTextColor="#000"
//         />
//         {touched.fullName && errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}
//       </View>

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={values?.emailAddress}
//           onChangeText={handleChange('emailAddress')}
//           placeholder="Enter your email"
//           placeholderTextColor="#000"
//         />
//         {touched.emailAddress && errors.emailAddress && <Text style={styles.error}>{errors.emailAddress}</Text>}
//       </View>

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={values?.phoneNo}
//           onChangeText={handleChange('phoneNo')}
//           placeholder="Enter your phone number"
//           placeholderTextColor="#000"
//         />
//         {touched.phoneNo && errors.phoneNo && <Text style={styles.error}>{errors.phoneNo}</Text>}

//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//               <Text style={styles.buttonText}>{loading ? <ActivityIndicator size={30} color="#fff" /> : 'Update'}</Text>
//      </TouchableOpacity>
//     </View>
//       )
//     }}
//   </Formik>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 15,
//     // backgroundColor: '#e0f0fa',
//   },
//   image: {
//     width: 130,
//     height: 130,
//     marginBottom: 20,
//     borderRadius: 30,
//   },
  
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     padding: 4,
//     marginBottom: 15,
//     borderColor: '#2084c7',
//     borderWidth: 1,
//     borderRadius: 10,
//   },
//   icon: {
//     width: 20,
//     height: 20,
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     color:'#c9c9c9'
//   },
//   button: {
//     paddingHorizontal: 20,
//     padding: 10,
//     backgroundColor: '#2084c7',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 6,
//     marginTop: 5,
//     elevation: 5,
//   },
//   buttonText: {
//     textAlign: 'center',
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//    error: {
//     fontSize: 11,
//     color: 'red',
//     alignSelf: 'flex-start',
//     marginBottom: 10,
//     marginTop: 0,
//     paddingTop: 0,
//     marginLeft: 6,
//   },
// });

// export default UpdateProfile;
