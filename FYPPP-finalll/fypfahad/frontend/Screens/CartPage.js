import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart, clearCart } from '../Redux/slice/cartSlice';

const { width } = Dimensions.get('window');

export default function CartPage({ navigation }) {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cart);

  const handleRemoveItem = (item) => {
    dispatch(removeItemFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleProceedToCheckout = () => {
    navigation.navigate('Checkout'); 
  };

  const Card = ({ animal }) => {
    return (
      <View style={styles.card}>
        <Image style={styles.cardImage} source={{ uri: animal.images[0]?.url }} />
        <View style={{ marginTop: 5 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Price: Rs. {animal.price}</Text>
          <Text style={{ fontSize: 14, color: 'black' }}>Weight: {animal.weight} kg</Text>
          <Text style={{ fontSize: 14, color: 'black' }}>Teeth: {animal.totalTeeth}</Text>
          <Text style={{ fontSize: 14, color: 'black', marginBottom: 5 }}>Breed: {animal.breed}</Text>
          <TouchableOpacity
            style={styles.addToCartButton}
            activeOpacity={0.8}
            onPress={() => handleRemoveItem(animal)}
          >
            <Text style={{ color: 'white', fontSize: 14, }}>Remove Item</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back" size={24} style={styles.icon} onPress={() => navigation.goBack()} />
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff', marginTop: 12 }}>
          Your Cart
        </Text>
        {items?.length > 0 ?
          <Text style={styles.cartCount}>
            {items.length}
          </Text> : <View></View>}
      </View>

      {items.length > 0 ?
        <>
          <FlatList
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: 10,
              paddingBottom: 50,
              paddingHorizontal: 10,
            }}
            numColumns={2}
            data={items}
            renderItem={({ item }) => {
              return <Card animal={item} />;
            }}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.proceedToCheckoutButton}
              onPress={handleProceedToCheckout}
              activeOpacity={0.8}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Proceed to Checkout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.removeAllitem}
              onPress={handleClearCart}
              activeOpacity={0.8}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Clear Cart {totalPrice > 0 ? totalPrice : ''}</Text>
            </TouchableOpacity>
          </View>
        </>
        :
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your Cart is Empty!</Text>
        </View>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f0fa',
  },
  icon: {
    marginTop: 17,
    color: '#fff'
  },
  header: {
    paddingTop: 25,
    paddingBottom: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#2084c7",
  },
  card: {
    height: 240,
    backgroundColor: '#ffffff',
    width: width * 0.5 - 18,
    marginHorizontal: 2,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 0.4,
    padding: 8,
  },
  cardImage: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 2,
  },
  addToCartButton: {
    height: 30,
    backgroundColor: '#2084c7',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  buttonContainer: {
    marginBottom: 8,
    marginHorizontal: 10,
  },
  proceedToCheckoutButton: {
    backgroundColor: '#2084c7',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 10,
  },
  removeAllitem: {
    backgroundColor: '#2084c7',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  emptyCartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  emptyCartText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  cartCount: {
    fontSize: 20,
    elevation: 0.5,
    fontWeight: 'bold',
    color: '#2084c7',
    marginTop: 13,
    backgroundColor: '#fff',
    borderRadius: 50,
    height: 30,
    width: 30,
    textAlign: 'center',
  },
});

