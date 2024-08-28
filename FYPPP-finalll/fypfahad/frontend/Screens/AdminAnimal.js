import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    View,
    SafeAreaView,
    ScrollView,
    Text,
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import animals from '../consts/animals';
import { useSelector } from 'react-redux';
import axiosInstance from '../inits/axios';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { gettingAnimal } from '../Redux/slice/animalSlice';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('window');

const Admin = () => {
    const navigation = useNavigation();
    const { animals } = useSelector((state) => state.animal);
    const dispatch = useDispatch();
    const categories = ['All', 'COW', 'GOAT', 'SHEEP', 'CAMEL'];
    const [categoryIndex, setCategoryIndex] = useState('All');
    const [loading, setLoading] = useState(false);
    const [index, setIndex] = useState();

    const [filteredAnimals, setFilteredAnimals] = useState(animals);

    useEffect(() => {
        getAnimalData()
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            getAnimalData();
        }, [])
    );

    useEffect(() => {
        if (categoryIndex === 'All') {
            setFilteredAnimals(animals)
        }
        else {
            const filtered = animals?.filter((animal) => animal.animalType === categoryIndex);
            if (filtered?.length) {
                setFilteredAnimals(filtered);
            } else {
                setFilteredAnimals([])
            }
        }
    }, [categoryIndex]);

    const getAnimalData = async () => {
        try {
            console.log('loading')
            const response = await axiosInstance.get('http://192.168.3.102:8080/api/v1/animal/get-all-animals');      //animal/get-all-animals
            dispatch(gettingAnimal(response?.data?.data))
            setFilteredAnimals(response?.data?.data)
            setIndex('')

        } catch (error) {
            console.error(error, 'error in animal');
        }
    };

    const handleDelete = async (id) => {
        const temp = await AsyncStorage.getItem('currentuser')
        const currentuser = JSON.parse(temp)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentuser?.authToken}`
            }
        };
        console.log(id)
        await axios.delete(`http://192.168.3.102:8080/api/v1/animal/delete-animal/${id}`, config)
            .then((response) => {
                getAnimalData()
                // console.log(response, 'after login')
            })
            .catch((e) => {
                console.log(e, 'in delete ')
                setIndex('')
            })
    }

    const Card = ({ animal }) => {
        return (
            <View style={styles.card}>
                {/* <View style={styles.imageContainer}> */}
                <Image style={styles.cardImage} source={{ uri: animal?.images[0]?.url }} />
                {/* </View> */}
                <View style={{ marginTop: -5, justifyContent: 'space-between' }}>
                    <View>

                        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 8, marginBottom: 2 }}>Title: {animal.title}</Text>
                        <Text style={{ fontSize: 14, color: 'black', marginBottom: 2 }}>Weight: {animal.weight} kg</Text>
                        <Text style={{ fontSize: 14, color: 'black', marginBottom: 2 }}>Teeth: {animal.totalTeeth}</Text>
                        <Text style={{ fontSize: 14, color: 'black', marginBottom: 2, }}>Breed: {animal.breed}</Text>
                        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 2 }}>Price: Rs. {animal.price}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity
                            style={styles.editbtn}
                            onPress={() => navigation.navigate('EditAnimal', { animal: animal })}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Icon name="edit" color='white' size={20} marginTop='5' />

                                {/* <Text style={{ color: 'white', fontWeight: 'bold', paddingLeft: '10', fontSize: 14 }}>Edit</Text> */}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.delbtn}
                            onPress={() => {
                                setIndex(animal?._id)
                                handleDelete(animal?._id)
                            }
                            }
                        >
                            <View>
                                {index === animal._id ? (
                                    <ActivityIndicator size='small' color="#fff" />
                                ) : (
                                    <>
                                        <Icon name="trash-o" color='white' size={20} />
                                    </>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

        );
    };

    const CategoryList = () => {
        const renderAnimalButton = (animalType, image) => {

            return (
                <TouchableOpacity
                    key={animalType}
                    style={[
                        styles.circleButton,
                        categoryIndex === animalType && styles.circleButtonSelected
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setCategoryIndex(animalType)}
                >
                    <Image source={image} style={styles.buttonImage} />
                    <Text
                        style={[
                            styles.buttonText,
                            categoryIndex === animalType && styles.buttonTextSelected,
                        ]}
                    >
                        {animalType}
                    </Text>
                </TouchableOpacity>
            );
        }

        return (
            <View style={styles.categoryContainer}>
                {categories.map((animalType) => (renderAnimalButton(animalType, getAnimalImage(animalType))
                    // <View key={animalType}>
                    // {renderAnimalButton(animalType, getAnimalImage(animalType))}
                    // </View>
                ))}
            </View>
        );
    };

    const getAnimalImage = (animalType) => {
        switch (animalType.toLowerCase()) {
            case 'cow':
                return require('../assets/Cowww.png');
            case 'goat':
                return require('../assets/goatsss.png');
            case 'sheep':
                return require('../assets/sheep.png');
            case 'camel':
                return require('../assets/camel-icon.png');
            default:
                return null;
        }
    };

    const handleSearch = (text) => {
        const searchTerm = text.toLowerCase();
        const filteredResult = animals?.filter(item =>
            item?.title?.toLowerCase().includes(searchTerm)
        );
        console.log(filteredResult, 'filteredResult')
        setFilteredAnimals(filteredResult);
    };
    const handlelogout = () => {
        console.log('signout---->>>')
        AsyncStorage.removeItem('currentuser');
        AsyncStorage.clear();
        navigation.navigate('FirstPage')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <View style={styles.header}>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5, marginHorizontal: 2, paddingRight: 10 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Welcome to Admin Panel</Text>
                        <TouchableOpacity onPress={() => { handlelogout() }}>
                            <Ionicons name="log-out-outline" size={28} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 38, fontWeight: 'bold', color: '#2084c7', marginTop: 4, marginHorizontal: 2 }}>
                        All Animal
                    </Text>

                </View>
                <View style={styles.searchContainer}>
                    <Icon name="search" size={15} style={{ marginLeft: 12, marginRight: 10 }} />
                    <TextInput placeholder="Search" style={styles.input} onChangeText={(text) => handleSearch(text)} />
                </View>

                <CategoryList />

                <FlatList
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: 10,
                        paddingBottom: 50,
                        margin: 8
                    }}
                    numColumns={2}
                    data={filteredAnimals}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => {
                        return <Card animal={item} />;
                    }}
                />


            </View>
            <TouchableOpacity style={styles.addbtn} onPress={() => { navigation.navigate('AddAnimal') }} >
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute' }}>
                    <Icon name="plus" color='#2084c7' size={30} />
                </View>
            </TouchableOpacity>
        </SafeAreaView>
        //     <ScrollView style={{ flex: 1 }}>
        //     <View style={styles.main}>
        //       <View style={styles.header}>
        //         <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5, marginHorizontal: 2, marginRight: 10 }}>
        //           <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Welcome to Admin Panel</Text>
        //           <TouchableOpacity onPress={() => { handlelogout }}>
        //             <Icon name="log-out-outline" size={28} />
        //           </TouchableOpacity>
        //         </View>
        //         <Text style={{ fontSize: 38, fontWeight: 'bold', color: '#2084c7', marginTop: 4, marginHorizontal: 2 }}>
        //           All Animal
        //         </Text>
        //       </View>
        //       <View style={styles.searchContainer}>
        //         <Icon name="search" size={15} style={{ marginLeft: 12, marginRight: 10 }} />
        //         <TextInput placeholder="Search" style={styles.input} onChangeText={(text) => handleSearch(text)} />
        //       </View>
        //       <CategoryList />
        //       <View style={{ flex: 1 }}>
        //         <FlatList
        //           columnWrapperStyle={{ justifyContent: 'space-between' }}
        //           showsVerticalScrollIndicator={false}
        //           contentContainerStyle={{
        //             marginTop: 10,
        //             paddingBottom: 50,
        //             margin: 8
        //           }}
        //           numColumns={2}
        //           data={filteredAnimals}
        //           keyExtractor={(item) => item._id}
        //           renderItem={({ item }) => {
        //             return <Card animal={item} />;
        //           }}
        //         />
        //       </View>
        //     </View>
        //     <TouchableOpacity style={styles.addbtn} onPress={() => { navigation.navigate('AddAnimal') }} >
        //       <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute' }}>
        //         <Icon name="plus" color='#2084c7' size={30} />
        //       </View>
        //     </TouchableOpacity>
        //   </ScrollView>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    main: {
        flex: 1,
        position: 'relative'
    },
    header: {
        marginTop: 40,
        paddingHorizontal: 10,
    },
    searchContainer: {
        height: 45,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        elevation: 0.9,
        margin: 8,
        color: 'grey'
    },
    input: {
        fontSize: 16,
        color: 'grey',
        flex: 1,
    },
    categoryContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 5,
        paddingTop: 8,
        paddingBottom: 18,
        paddingHorizontal: 18,
        marginHorizontal: 8,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        elevation: 3,
        borderRadius: 50,
    },
    card: {
        // height: 240, 
        backgroundColor: '#ffffff',
        width: width * 0.5 - 16,
        marginHorizontal: 2,
        borderRadius: 15,
        elevation: 0.4,
        marginBottom: 12,
        padding: 8,
    },

    cardImage: {
        flex: 1,
        height: 100,
        resizeMode: 'contain',
        borderRadius: 10,
        width: '100%',
    },
    circleButton: {
        width: 52,
        height: 52,
        // margin:5,
        borderRadius: 40,
        // paddingHorizontal:10,
        backgroundColor: '#aec6d5',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    buttonImage: {
        width: 40,
        height: 40,
        borderRadius: 15,
        resizeMode: 'contain',
        position: 'absolute',
    },
    circleButtonSelected: {
        backgroundColor: '#2084c7',
    },
    buttonText: {
        fontSize: 11,
        color: 'grey',
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute',
        bottom: -16
    },
    buttonTextSelected: {
        color: '#2084c7',
    },
    buttonImage: {
        width: 48,
        height: 48,
        borderRadius: 15,
        resizeMode: 'contain',
        position: 'absolute',
    },
    editbtn: {
        // height: 30,
        padding: 5,
        margin: 1,
        width: '40%',
        marginLeft: 3,
        backgroundColor: 'green',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    delbtn: {
        // height: 30,
        padding: 5,
        margin: 1,
        width: '40%',
        marginLeft: 3,
        backgroundColor: 'red',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    qty: {
        backgroundColor: 'red',
        padding: 2,
        color: '#fff',
        borderRadius: 100,
        fontSize: 15,
        fontWeight: 'bold',
        position: 'absolute',
        right: 1,
        textAlign: 'center',
        top: 12,
        zIndex: 2,
        height: 25,
        width: 25,
    },
    addbtn: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 10,
        left: '44%',
        bottom: 30
    }
});

export default Admin;
