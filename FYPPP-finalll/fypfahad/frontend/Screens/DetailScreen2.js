import React, { useState, useRef } from 'react';
import { View, SafeAreaView, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dimensions } from 'react-native';

const DetailScreen2 = ({ navigation, route }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const animal = route.params;
    const imageRefs = useRef(null);

    const handleImagePress = (index) => {
        imageRefs.current.scrollTo({ x: index * windowWidth, y: 0, animated: true });
    };

    const handleBuyPress = () => {
        console.log('Buy button pressed');
        navigation.navigate('UserInformationPage');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e0f0fa' }}>
            <View style={styles.headerContainer}>
                <View style={styles.headerStrip}></View>
                <View style={styles.header}>
                    <Icon name="arrow-back" size={28} style={styles.icon} onPress={() => navigation.goBack()} />
                    <Icon name="shopping-cart" size={28} style={[styles.icon, { marginBottom: 10 }]} />
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
                {[animal.image, animal.image2, animal.image3].map((image, index) => (
                    <Image key={index} source={image} style={styles.image} />
                ))}
            </ScrollView>
            <View style={styles.paginationContainer}>
                {[...Array(3).keys()].map((index) => (
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
                        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#2084c7' }}>{`"${animal.name}"`}</Text>
                        <View style={styles.priceTag}>
                            <Text style={{ marginLeft: 15, color: 'white', fontWeight: 'bold', fontSize: 22 }}>Rs. {animal.price}</Text>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 20, marginTop: -50 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textDecorationLine: 'underline', marginBottom: 5 }}>About:</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                            <Icon name="fiber-manual-record" size={12} color="black" style={{ marginRight: 5 }} />
                            <Text style={{ fontSize: 20, color: 'black' }}>Weight: {animal.weight} kg</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                            <Icon name="fiber-manual-record" size={12} color="black" style={{ marginRight: 5 }} />
                            <Text style={{ fontSize: 20, color: 'black' }}>Teeth: {animal.teeth}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                            <Icon name="fiber-manual-record" size={12} color="black" style={{ marginRight: 5 }} />
                            <Text style={{ fontSize: 20, color: 'black' }}>Breed: {animal.breed}</Text>
                        </View>
                    </View>
                    <View style={styles.buyBtn}>
                        <TouchableOpacity onPress={() => handleBuyPress()}>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Delegate Qurbani</Text>
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
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        marginTop: 15,
    },
    headerContainer: {
        backgroundColor: '#7FB8E3',
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
        width: 175,
        height: 60,
        backgroundColor: '#7FB8E3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 20,
        marginLeft: 80,
        borderColor: '#3498db',
        borderWidth: 1.5,
        elevation: 15,
    },
    image: {
        resizeMode: 'contain',
        width: windowWidth,
        height: '100%',
        marginTop: 12,
    },
});

export default DetailScreen2;