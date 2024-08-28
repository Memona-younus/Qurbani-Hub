import React, { useState, useRef, useEffect } from 'react';
import { View, SafeAreaView, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions } from 'react-native';
import axiosInstance from '../inits/axios';
import { addItemToCart } from '../Redux/slice/cartSlice';
import { useNavigation } from '@react-navigation/native';

const DetailScreen = ({ navigation, route }) => {
    const { items } = useSelector((state) => state.cart);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [animal, setAnimal] = useState('')
    const { _id } = route.params;
    const dispatch = useDispatch();
    const imageRefs = useRef(null);

    useEffect(() => {
        getAnimalbyId()

    }, [])


    const getAnimalbyId = async () => {
        try {
            console.log('loading')
            const response = await axiosInstance.get(`http://192.168.3.102:8080/api/v1/animal/get-animal/${route?.params}`);
            console.log(response?.data?.data);
            setAnimal(response?.data?.data)
        } catch (error) {
            console.error(error, 'error in animal');
        }
    };

    const handleImagePress = (index) => {
        imageRefs.current.scrollTo({ x: index * windowWidth, y: 0, animated: true });
    };

    const handleAddToCart = (item) => {
        dispatch(addItemToCart(item));
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>            
            <View style={styles.headerContainer}>
                <View style={styles.headerStrip}></View>
                {items?.length > 0 ? <Text style={styles.qty}>{items?.length}</Text> : ''}
                <View style={styles.header}>
                    <Icon name="arrow-back" size={30} style={styles.icon} onPress={() => navigation.goBack()} />
                    <Icon name="shopping-cart" size={33} style={[styles.icon, { marginBottom: 10 }]} onPress={() => { navigation.navigate('CartPage') }} />
                </View>
            </View>
            <ScrollView
                ref={imageRefs}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={(event) => {
                    const offsetX = event.nativeEvent.contentOffset.x;
                    const index = Math.round(offsetX / windowWidth);
                    setActiveImageIndex(index);
                }}
                style={{ marginTop: 0, marginBottom: 15 }}
            >
                {animal?.images?.map((image, index) => (
                    <Image key={index} source={{ uri: image?.url }} style={styles.image} />
                ))}
            </ScrollView>
            <View style={styles.paginationContainer}>
                {animal?.images?.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.paginationDot,
                            {
                                backgroundColor: index === activeImageIndex ? '#2084c7' : '#ccc',
                            },
                        ]}
                        onPress={() => handleImagePress(index)}
                    />
                ))}
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.detailsContent}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: -76 }}>
                        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#2084c7' }}>{`"${animal?.title}"`}</Text>
                        <View style={styles.priceTag}>
                            <Text style={{ marginLeft: 15, color: 'white', fontWeight: 'bold', fontSize: 22 }}>Rs. {animal?.price}</Text>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 20, marginTop: -50 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textDecorationLine: 'underline', marginBottom: 5 }}>About:</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                            <Icon name="fiber-manual-record" size={12} color="black" style={{ marginRight: 5 }} />
                            <Text style={{ fontSize: 20, color: 'black' }}>Weight: {animal?.weight} kg</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                            <Icon name="fiber-manual-record" size={12} color="black" style={{ marginRight: 5 }} />
                            <Text style={{ fontSize: 20, color: 'black' }}>Teeth: {animal?.totalTeeth}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                            <Icon name="fiber-manual-record" size={12} color="black" style={{ marginRight: 5 }} />
                            <Text style={{ fontSize: 20, color: 'black' }}>Breed: {animal?.breed}</Text>
                        </View>
                    </View>
                    <View style={styles.buyBtn}>
                        <TouchableOpacity onPress={() => {
                            handleAddToCart(animal);
                            navigation.navigate('Checkout'); 
                        }}>
                            <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>Buy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        marginTop: 15,
    },
    headerContainer: {
        backgroundColor: '#7FB8E3',//"#59a6e6",//"#2084c7", //'',
    },
    headerStrip: {
        height: 8,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 15,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 3,
    },
    detailsContainer: {
        marginTop: 0,
        paddingTop: 20,
        flex: 1,
    },
    detailsContent: {
        marginLeft: 20,
    },
    priceTag: {
        backgroundColor: "#95adbe",
        width: 130,
        height: 50,
        borderTopLeftRadius: 35,
        borderBottomLeftRadius: 35,
        justifyContent: 'center',
        marginTop: 120,
    },
    buyBtn: {
        width: 110,
        height: 50,
        backgroundColor: '#7FB8E3', //'#2084c7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 10,
        marginLeft: 110,
        borderColor: '#3498db',
        borderWidth: 1.5,
        elevation: 30,
        // 7FB8E3'
    },
    image: {
        resizeMode: 'contain',
        width: windowWidth,
        height: '100%',
        marginTop: 12,
    },
    qty: {
        backgroundColor: '#2084c7',
        padding: 2,
        color: '#fff',
        borderRadius: 100,
        fontSize: 15,
        fontWeight: 'bold',
        position: 'absolute',
        right: 20,
        textAlign: 'center',
        top: 35,
        zIndex: 2,
        height: 25,
        width: 25,
        borderWidth: 2, // Adding border width
        borderColor: 'black', // Adding black border color
    }
});

export default DetailScreen;