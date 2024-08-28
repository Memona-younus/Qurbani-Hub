import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import animals from '../consts/animals';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../inits/axios';
import { addItemToCart } from '../Redux/slice/cartSlice';
import { gettingAnimal } from '../Redux/slice/animalSlice';
const { width } = Dimensions.get('window');


const BrowseChoose = ({ navigation }) => {
  const { items } = useSelector((state) => state.cart);
  const { animals } = useSelector((state) => state.animal);


  const dispatch = useDispatch();
  const categories = ['All', 'COW', 'GOAT', 'SHEEP', 'CAMEL'];
  const [categoryIndex, setCategoryIndex] = useState('All');
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getAnimalData()
  }, [])

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
      const response = await axiosInstance.get('http://192.168.3.102:8080/api/v1/animal/get-All-animals');
      dispatch(gettingAnimal(response?.data?.data))
      setFilteredAnimals(response?.data?.data)
    } catch (error) {
      console.error(error, 'error in animal');
    }
  };

  const handleAddToCart = (animal) => {
    dispatch(addItemToCart(animal));
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
    if (text == '') {
      setShow(false)
      setFilteredAnimals(animals);
    }
    else {
      setShow(true)
      const searchTerm = text.toLowerCase();
      console.log(searchTerm, 'searchTerm')
      console.log(filteredAnimals, 'filteredAnimals')
      const filteredResult = filteredAnimals?.filter(item =>
        item?.title?.toLowerCase().includes(searchTerm)
      );
      console.log(filteredResult, 'filteredResult')
      setFilteredAnimals(filteredResult);
    }
    // setSearchTerm(searchTerm);
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

  const Card = ({ animal }) => {
    console.log(animal)
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('DetailScreen', animal?._id)}
      >
        <View style={styles.card}>
          {/* <View style={styles.imageContainer}> */}
          <Image style={styles.cardImage} source={{ uri: animal.images[0]?.url }} />
          {/* </View> */}
          <View style={{ marginTop: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Price: Rs. {animal.price}</Text>
            <Text style={{ fontSize: 14, color: '#555' }}>Title: {animal.title} </Text>
            <Text style={{ fontSize: 14, color: '#555' }}>Weight: {animal.weight} kg</Text>
            <Text style={{ fontSize: 14, color: '#555' }}>Teeth: {animal.totalTeeth}</Text>
            <Text style={{ fontSize: 14, color: '#555', marginBottom: 5 }}>Breed: {animal.breed}</Text>
            <TouchableOpacity
              style={styles.addToCartButton}
              activeOpacity={0.8}
              onPress={() => handleAddToCart(animal)}
            >
              <Text style={{ color: 'white', fontSize: 14, }}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
          <Icon name="arrow-left" size={30} color="black" style={{ marginTop: 18 }}/>
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 17 }}>Shared</Text>
          <Text style={{ fontSize: 33, marginBottom: 10, fontWeight: 'bold', color: '#2084c7', marginTop: -8 }}>
          Qurbani Blessings
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('CartPage')} style={{ position: 'relative' }}>
          {items?.length > 0 ? <Text style={styles.qty}>{items?.length}</Text> : ''}
          <View style={{ zIndex: 1 }}>
            <Icon name="shopping-cart" size={34} style={{ marginTop: 17 }} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <Icon name="search" size={18} color='grey' style={{ marginLeft: 12, marginRight: 10 }} />
        <TextInput placeholder="Search" style={styles.input} onChangeText={(text) => handleSearch(text)} />
      </View>
      {!show && <CategoryList />}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 10,
    // backgroundColor:'#fff'
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 5,
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
    // borderWidth: 0.75,
    // borderColor: '#2084c7',
  },
  input: {
    fontSize: 18,
    paddingHorizontal: 5,
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
    borderRadius: 10,
    elevation: 0.4,
    marginBottom: 12,
    padding: 8,
  },

  cardImage: {
    flex: 1,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 2,
    // width: '100%',
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
  addToCartButton: {
    height: 25,
    backgroundColor: '#2084c7',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  qty: {
    backgroundColor: '#2084c7',
    padding: 2,
    color: '#fff',
    borderRadius: 100,
    fontSize: 12,
    fontWeight: 'bold',
    position: 'absolute',
    right: 1,
    textAlign: 'center',
    top: 12,
    zIndex: 2,
    height: 22,
    width: 22,
    borderWidth: 2, // Adding border width
    borderColor: 'black', // Adding black border color
  }
});

export default BrowseChoose;
