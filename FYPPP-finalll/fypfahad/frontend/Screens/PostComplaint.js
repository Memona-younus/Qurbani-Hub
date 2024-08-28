import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';

const PostComplaint = () => {
    const navigation = useNavigation();
    const [postStatus, setPostStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpdateAnimal = async (values) => {
        setLoading(true)
        try {
            const temp = await AsyncStorage.getItem('token')
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${temp}`
                }
            };
           
            const response = await axios.post('http://192.168.3.102:8080/api/v1/complaint/create-new-complaint', values, config);
            if (response?.data?.success) {
                setLoading(false)
                setPostStatus(response?.data?.statusMessage)
            }
        }  
        catch (error) {
            setLoading(false);
            if (error.response) {
              Alert.alert(`${error.response.data.message}`)
            } else {
              Alert.alert(error.message)
              console.log('Error:', error.message);
            }
        }
    }


    const handleOKPress = () => {
        if (postStatus === 'Success') {
            // Navigate to the home page
            navigation.navigate('HomePage'); // Replace 'Home' with the actual name of your home screen
        } else {
            // Reset post status and close the message
            setPostStatus(null);
        }
    };

    const validationSchema = yup.object().shape({
        title: yup.string().required('This field is required'),
        description: yup.string().required('This field is required'),
    });

    return (
        <Formik
            initialValues={{ title: '', description: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                handleUpdateAnimal(values);
                setSubmitting(false);
            }}
        >
            {({ values, handleChange, handleSubmit, errors, touched }) => {
                console.log(errors, 'error------->>>')
                return (
                    <View style={styles.container}>
                        <Image
                            source={require('../assets/handholdppr.png')} // Change the path according to your actual image path
                            style={styles.image}
                        />
                        <Text style={[styles.heading, { marginTop: -140 }]}>Complaints{'\n'}</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Complaint Title"
                            onChangeText={handleChange('title')}
                            value={values.title}
                        />

                        {errors.title && touched.title && (
                            <Text style={styles.error}>{errors.title}</Text>
                        )}
                        <TextInput
                            style={[styles.input, styles.descriptionInput]}
                            placeholder="Complaint Description"
                            onChangeText={handleChange('description')}
                            value={values.description}
                            multiline={true}
                            numberOfLines={7}
                        />
                        {errors.description && touched.description && (
                            <Text style={styles.error}>{errors.description}</Text>
                        )}
                        <TouchableOpacity style={styles.addbtn} onPress={handleSubmit} activeOpacity={0.9}>
                            <Text style={styles.addbtnText}>{loading ? <ActivityIndicator size={30} color="#fff" /> : 'Post Complaint'}</Text>
                        </TouchableOpacity>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={postStatus === 'Success'}
                            onRequestClose={handleOKPress}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.successMessageText}>
                                        Your complaint has been successfully posted! 🌟
                                        Thank you for contributing to the improvement of our services.
                                    </Text>
                                    <TouchableOpacity style={styles.okButton} onPress={handleOKPress} activeOpacity={0.9}>
                                        <Text style={styles.buttonText}>OK</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>

                )
            }}
        </Formik>
    )
};

const styles = StyleSheet.create({

    image: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#e0f0fa',
    },
    heading: {
        fontSize: 29,
        fontWeight: 'bold',
        marginBottom: 80,
        textAlign: 'center',
        color: "#2084c7",
    },
    input: {
        paddingLeft: 10,
        borderRadius: 8,
        fontSize: 16,
        padding: 10,
        backgroundColor: '#ffffff',
        color: 'grey',
        textAlignVertical: 'top',
        marginBottom: 10,
        //     borderColor: '#2084c7',
        // borderWidth: 1,

    },
    addbtn: {
        paddingHorizontal: 20,
        padding: 10,
        backgroundColor: '#2084c7',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        marginTop: 5,
        elevation: 5,
    },
    addbtnText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    successMessageText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    okButton: {
        backgroundColor: "#2084c7",
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    error: {
        fontSize: 11,
        color: 'red',
        alignSelf: 'flex-start',
        marginBottom: 10,
        marginTop: 0,
        paddingTop: 0,
        marginLeft: 6,
    }

});

export default PostComplaint;

// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, ActivityIndicator } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import { Formik } from 'formik';
// import * as yup from 'yup';

// const PostComplaint = () => {
//     const navigation = useNavigation();
//     const [postStatus, setPostStatus] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const handleUpdateAnimal = async (values) => {
//         setLoading(true)
//         try {
//             const temp = await AsyncStorage.getItem('currentuser')
//             const currentuser = JSON.parse(temp)
//             const config = {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${currentuser?.authToken}`
//                 }
//             };
           
//             const response = await axios.post('http://172.16.187.83:8080/api/v1/complaint/create-new-complaint', values, config);
//             if (response?.data?.success) {
//                 setLoading(false)
//                 setPostStatus(response?.data?.statusMessage)
//                 console.log('complaint===========>>>>', response?.data)
//             }
//         }  
//         catch (error) {
//             setLoading(false);
//             if (error.response) {
//               Alert.alert(`${error.response.data.message}`)
//             } else {
//               Alert.alert(error.message)
//               console.log('Error:', error.message);
//             }
//         }
//     }


//     const handleOKPress = () => {
//         if (postStatus === 'Success') {
//             // Navigate to the home page
//             navigation.navigate('HomePage'); // Replace 'Home' with the actual name of your home screen
//         } else {
//             // Reset post status and close the message
//             setPostStatus(null);
//         }
//     };

//     const validationSchema = yup.object().shape({
//         title: yup.string().required('This field is required'),
//         description: yup.string().required('This field is required'),
//     });

//     return (
//         <Formik
//             initialValues={{ title: '', description: '' }}
//             validationSchema={validationSchema}
//             onSubmit={(values, { setSubmitting }) => {
//                 handleUpdateAnimal(values);
//                 setSubmitting(false);
//             }}
//         >
//             {({ values, handleChange, handleSubmit, errors, touched }) => {
//                 console.log(errors, 'error------->>>')
//                 return (
//                     <View style={styles.container}>
//                         <Image
//                             source={require('../assets/handholdppr.png')} // Change the path according to your actual image path
//                             style={styles.image}
//                         />
//                         <Text style={[styles.heading, { marginTop: -140 }]}>Complaints{'\n'}</Text>

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Complaint Title"
//                             onChangeText={handleChange('title')}
//                             value={values.title}
//                         />

//                         {errors.title && touched.title && (
//                             <Text style={styles.error}>{errors.title}</Text>
//                         )}
//                         <TextInput
//                             style={[styles.input, styles.descriptionInput]}
//                             placeholder="Complaint Description"
//                             onChangeText={handleChange('description')}
//                             value={values.description}
//                             multiline={true}
//                             numberOfLines={7}
//                         />
//                         {errors.description && touched.description && (
//                             <Text style={styles.error}>{errors.description}</Text>
//                         )}
//                         <TouchableOpacity style={styles.addbtn} onPress={handleSubmit} activeOpacity={0.9}>
//                             <Text style={styles.addbtnText}>{loading ? <ActivityIndicator size={30} color="#fff" /> : 'Post Complaint'}</Text>
//                         </TouchableOpacity>

//                         <Modal
//                             animationType="slide"
//                             transparent={true}
//                             visible={postStatus === 'Success'}
//                             onRequestClose={handleOKPress}
//                         >
//                             <View style={styles.modalContainer}>
//                                 <View style={styles.modalContent}>
//                                     <Text style={styles.successMessageText}>
//                                         Your complaint has been successfully posted! 🌟
//                                         Thank you for contributing to the improvement of our services.
//                                     </Text>
//                                     <TouchableOpacity style={styles.okButton} onPress={handleOKPress} activeOpacity={0.9}>
//                                         <Text style={styles.buttonText}>OK</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>
//                         </Modal>
//                     </View>

//                 )
//             }}
//         </Formik>
//     )
// };

// const styles = StyleSheet.create({

//     image: {
//         width: '100%',
//         height: 200,
//         marginBottom: 20,
//         resizeMode: 'cover',
//         borderRadius: 8,
//     },
//     container: {
//         flex: 1,
//         padding: 20,
//         justifyContent: 'center',
//         // backgroundColor: '#ffffff',
//     },
//     heading: {
//         fontSize: 29,
//         fontWeight: 'bold',
//         marginBottom: 80,
//         textAlign: 'center',
//         color: "#2084c7",
//     },
//     input: {
//         paddingLeft: 10,
//         borderRadius: 8,
//         fontSize: 16,
//         padding: 10,
//         backgroundColor: '#ffffff',
//         color: 'grey',
//         textAlignVertical: 'top',
//         marginBottom: 10,
//         //     borderColor: '#2084c7',
//         // borderWidth: 1,

//     },
//     addbtn: {
//         paddingHorizontal: 20,
//         padding: 10,
//         backgroundColor: '#2084c7',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 6,
//         marginTop: 5,
//         elevation: 5,
//     },
//     addbtnText: {
//         textAlign: 'center',
//         fontSize: 15,
//         fontWeight: 'bold',
//         color: '#fff',
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingHorizontal: 15,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
//     },
//     modalContent: {
//         backgroundColor: '#fff',
//         padding: 20,
//         borderRadius: 8,
//         alignItems: 'center',
//     },
//     successMessageText: {
//         color: '#000',
//         fontSize: 18,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginBottom: 10,
//     },
//     okButton: {
//         backgroundColor: "#2084c7",
//         padding: 8,
//         borderRadius: 5,
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//         fontSize: 16,
//         paddingVertical: 5,
//         paddingHorizontal: 10,
//     },
//     error: {
//         fontSize: 11,
//         color: 'red',
//         alignSelf: 'flex-start',
//         marginBottom: 10,
//         marginTop: 0,
//         paddingTop: 0,
//         marginLeft: 6,
//     }

// });

// export default PostComplaint;