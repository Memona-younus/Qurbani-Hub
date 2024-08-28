// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Button, FlatList, Alert, Image } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios'
// import Icon from 'react-native-vector-icons/FontAwesome';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useDispatch } from 'react-redux';
// import { gettingAnimal } from '../Redux/slice/animalSlice';

// const AddAnimal = ({ navigation }) => {

//   const dispatch = useDispatch();
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [value, setValue] = useState(null);
//   const [items, setItems] = useState([
//     { label: 'Cow', value: 'COW' },
//     { label: 'Camel', value: 'CAMEL' },
//     { label: 'Sheep', value: 'SHEEP' },
//     { label: 'Goat', value: 'GOAT' },
//   ]);

//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     price: '',
//     totalTeeth: '',
//     weight: '',
//     breed: '',
//     // images: [
//     //   'https://res.cloudinary.com/dm7vpvqcp/image/upload/v1705312639/qurbani-hub-animals/xbcnqtzkoca8ziitww7h.jpg',
//     //   'https://res.cloudinary.com/dm7vpvqcp/image/upload/v1705312639/qurbani-hub-animals/xbcnqtzkoca8ziitww7h.jpg',
//     //   'https://res.cloudinary.com/dm7vpvqcp/image/upload/v1705312639/qurbani-hub-animals/xbcnqtzkoca8ziitww7h.jpg',
//     // ],
//   });

//   useEffect(() => {
//     getPermission();
//   }, []);

//   const getPermission = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission Denied', 'Please enable media library permissions to choose images.');
//     }
//   };


//   const pickImage = async () => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.All,
//         allowsEditing: true,
//         aspect: undefined,
//         quality: 1,
//       });
//       if (!result.canceled) {
//         // const imageInfo = {
//         //   uri: result.uri,
//         //   type: 'image/jpeg', // Adjust the type as needed based on your requirements
//         //   name: result.filename, // Adjust the filename as needed based on your requirements
//         //   filename: result.filename, // Adjust the filename as needed based on your requirements
//         // };
//         const image = result.assets[0];
//         console.log(image, 'Images-------------->>>>')

//         setSelectedImages([...selectedImages, image]);

//       } 
//     } catch (error) {
//       console.error('Error picking an image', error);
//     }
//   };

//   const handleAddAnimal = async () => {
//     setLoading(true)
//     try {
//       const temp = await AsyncStorage.getItem('currentuser')
//       const currentuser = JSON.parse(temp)
//       const config = {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${currentuser?.authToken}`
//         }
//       };

//       const formData1 = new FormData();
//       formData1.append('title', formData.title);
//       formData1.append('description', formData.description);
//       formData1.append('price', formData.price);
//       formData1.append('totalTeeth', formData.totalTeeth);
//       formData1.append('weight', formData.weight);
//       formData1.append('breed', formData.breed);
//       formData1.append('animalType', value);

//       selectedImages.forEach((image, index) => {
//         formData1.append('images', {
//           uri: image.uri,
//           type: 'image/jpeg',
//           name: `animal_${index}.jpg`,
//           fiename: `animal_${index}.jpg`,
//         });
//       });
//       const response = await axios.post('http://172.16.187.83:8080/api/v1/animal/create-new-animal',formData1,config);
//       if (response?.status == 201) {
//         // getAnimalData();
//         setLoading(false)
//         navigation.navigate('AdminAnimal');
//         // Alert.alert('Animal Created Successfully', [
//         //   { text: 'OK', onPress: () => navigation.navigate('AdminAnimal') },
//         // ]);
//       }
//     } catch (error) {
//       // Alert.alert(error.message, [
//       //   { text: 'OK' },
//       // ]);
//       setLoading(false)
//       console.log('y000000000000000000000000000000',error.message);
//     }
//   };

//     const deleteImage = (index) => {
//     const newImages = [...selectedImages];
//     newImages.splice(index, 1);
//     setSelectedImages(newImages);
//   };


//   const handleForm = (key, value) => {
//     setFormData({ ...formData, [key]: value });
//   };

//   const inputFields = [
//     { key: 'title', placeholder: 'Title' },
//     { key: 'description', placeholder: 'Description' },
//     { key: 'price', placeholder: 'Price', keyboardType: 'numeric' },
//     { key: 'totalTeeth', placeholder: 'Total Teeth', keyboardType: 'numeric' },
//     { key: 'weight', placeholder: 'Weight', keyboardType: 'numeric' },
//     { key: 'breed', placeholder: 'Breed' },
//   ];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>ANIMALS INFO</Text>
//       <DropDownPicker
//         style={{
//           placeholderTextColor: '#a2a2b5',
//           height: 48,
//           borderColor: '#7FB8E3',
//           color: '#a2a2b5',
//           borderWidth: 1,
//           padding: 10,
//           marginTop: 2,
//           marginBottom: 12,
//           borderRadius: 12,
//         }}
//         open={open}
//         value={value}
//         items={items}
//         setOpen={setOpen}
//         setValue={setValue}
//         setItems={setItems}
//       />
//       <FlatList
//         data={inputFields}
//         renderItem={({ item }) => (
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder={item.placeholder}
//               placeholderTextColor="#a2a2b5"
//               keyboardType={item.keyboardType}
//               onChangeText={(text) => handleForm(item.key, text)}
//             />
//           </View>
//         )}
//         keyExtractor={(item) => item.key.toString()}
//       />

//       <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 10, paddingTop: 10 }}>
//         {selectedImages.map((image, index) => (
//           <View style={{ position: 'relative' }} key={index}>
//             <Image
//               source={{ uri: image.uri }}  // Extract 'uri' property
//               style={{ width: 96, height: 100, margin: 5, borderRadius: 5 }}
//             />
//             <TouchableOpacity onPress={() => deleteImage(index)} style={styles.qty}>
//               <Text style={{ textAlign: 'center' }}><Icon name="close" size={15} color='#fff' /></Text>
//             </TouchableOpacity>
//           </View>
//         ))}
//       </View>

//       <TouchableOpacity style={styles.addImages} onPress={pickImage}>
//         <Text style={styles.buttonText1}>Pick Image</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.addButton} onPress={handleAddAnimal}>
//         <Text style={styles.buttonText}>{loading ? <ActivityIndicator size={30} color="#fff" /> : 'ADD'}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 35,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     marginBottom: 20,
//     marginTop: 35,
//     color: '#2084c7',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   input: {
//     flex: 1,
//     height: 48,
//     borderColor: '#7FB8E3',
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 12,
//   },
//   addButton: {
//     backgroundColor: '#7FB8E3',
//     padding: 8,
//     borderRadius: 999,
//     alignItems: 'center',
//     width: '100%',
//     borderColor: '#2084c7',
//     shadowColor: '#2084c7',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowRadius: 30,
//     elevation: 8,
//     shadowOpacity: 0.55,
//   },
//   addImages: {
//     padding: 5,
//     marginBottom: 5,
//     borderRadius: 999,
//     alignItems: 'center',
//     width: '100%',
//     borderWidth: 1,
//     borderColor: '#7FB8E3',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   buttonText1: {
//     color: '#7FB8E3',
//     fontSize: 16,
//   },
//   qty: {
//     backgroundColor: '#7FB8E3',
//     color: '#fff',
//     borderRadius: 100,
//     position: 'absolute',
//     right: 0,
//     textAlign: 'center',
//     top: 1,
//     zIndex: 2,
//     height: 18,
//     width: 18,
//   }
// });

// export default AddAnimal;



import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Button, FlatList, Alert, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as yup from 'yup';

const AddAnimal = ({ navigation }) => {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [value, setValue] = useState(null);

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
    selectedImages: yup.array()
    .min(3, 'Minimum 3 images are required')
    .required('At least 3 images are required'),
  });

  const initialValues = {
    title: '',
    description: '',
    price: '',
    totalTeeth: '',
    weight: '',
    breed: '',
    animalType: '',
    selectedImages: [],
  };

  useEffect(() => {
    getPermission();
  }, []);

  const getPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please enable media library permissions to choose images.');
    }
  };


  const pickImage = async ({ setFieldValue, values }) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: undefined,
        quality: 1,
      });
      if (!result.canceled) {
        const image = result.assets[0];
        console.log(image, 'Images-------------->>>>');
        const updatedImages = [...values.selectedImages, image];
        setFieldValue('selectedImages', updatedImages);
      }
    } catch (error) {
      console.error('Error picking an image', error);
    }
  };

  const handleAddAnimal = async (values) => {
    setLoading(true)
    try {
      const temp = await AsyncStorage.getItem('token')
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${temp}`
        }
      };

      const formData1 = new FormData();
      formData1.append('title', values.title);
      formData1.append('description', values.description);
      formData1.append('price', values.price);
      formData1.append('totalTeeth', values.totalTeeth);
      formData1.append('weight', values.weight);
      formData1.append('breed', values.breed);
      formData1.append('animalType', values?.animalType);

      values?.selectedImages?.forEach((image, index) => {
        formData1.append('images', {
          uri: image.uri,
          type: 'image/jpeg',
          name: `animal_${index}.jpg`,
          fiename: `animal_${index}.jpg`,
        });
      });
      const response = await axios.post('http://192.168.3.102:8080/api/v1/animal/create-new-animal', formData1, config);
      if (response?.status == 201) {
        // getAnimalData();
        setLoading(false)
        navigation.navigate('AdminAnimal');
        // Alert.alert('Animal Created Successfully', [
        //   { text: 'OK', onPress: () => navigation.navigate('AdminAnimal') },
        // ]);
      }
    } catch (error) {
      setLoading(false);
      // resetForm();
      if (error.response) {
        // Alert.alert(error.response.data.message)
        console.error('Error response message:',  error.response.data.message);
      }else {
        console.error('Error:', error.message);
        Alert.alert(error.message)
      }
    }
  };

  const deleteImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
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
      <Text style={styles.heading}>ANIMALS INFO</Text>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleAddAnimal(values);
          setSubmitting(false);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit,setFieldValue, values, errors, touched }) => (
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
                    value={values[item.key]}
                  />
                  {touched[item.key] && errors[item.key] && <Text style={styles.error}>{errors[item.key]}</Text>}
                </View>
              )}
              keyExtractor={(item) => item.key}
            />

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 10, paddingTop: 10 }}>
              {values.selectedImages.map((image, index) => (
                <View style={{ position: 'relative' }} key={index}>
                  <Image
                    source={{ uri: image.uri }}
                    style={{ width: 96, height: 100, margin: 5, borderRadius: 5 }}
                  />
                  <TouchableOpacity onPress={() => deleteImage(index)} style={styles.qty}>
                    <Text style={{ textAlign: 'center' }}><Icon name="close" size={15} color='#fff' /></Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.addImages} onPress={() => pickImage({ setFieldValue, values })}>
              <Text style={styles.buttonText1}>Pick Image</Text>
            </TouchableOpacity>
            {touched.selectedImages && errors.selectedImages && <Text style={styles.error}>{errors.selectedImages}</Text>}

            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>{loading ? <ActivityIndicator size={30} color="#fff" /> : 'ADD'}</Text>
            </TouchableOpacity>

          </>
        )}
      </Formik>
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
    borderColor: '#2084c7',
    backgroundColor: '#ffffff',
    color: 'grey',
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
  },
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

  // addButton: {
  //   backgroundColor: '#2084c7',
  //   padding: 5,
  //   borderRadius: 999,
  //   alignItems: 'center',
  //   width: '100%',
  //   borderColor: '#2084c7',
  //   shadowColor: '#2084c7',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowRadius: 30,
  //   elevation: 3,
  //   shadowOpacity: 0.5,
  // },
  addImages: {
    padding: 5,
    marginBottom: 5,
    borderRadius: 999,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#2084c7',
  },

  buttonText1: {
    color: '#2084c7',
    fontSize: 16,
  },
  qty: {
    backgroundColor: '#2084c7',
    color: '#fff',
    borderRadius: 100,
    position: 'absolute',
    right: 0,
    textAlign: 'center',
    top: 1,
    zIndex: 2,
    height: 18,
    width: 18,
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
  dropDownPicker:{
    placeholderTextColor: '#a2a2b5',
    height: 48,
    borderColor: '#2084c7',
    color: '#a2a2b5',
    borderWidth: 1,
    padding: 10,
    marginTop: 2,
    marginBottom: 5,
    borderRadius: 12,
  }
});

export default AddAnimal;
