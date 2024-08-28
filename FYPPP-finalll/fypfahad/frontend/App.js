import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
// import { StripeProvider } from '@stripe/stripe-react-native';
import SplashScreen from './Screens/SplashScreen.js';
import FirstPage from './Screens/FirstPage.js';
import SignIn from './Screens/SignIn.js';
import SignUp from './Screens/SignUp.js';
import PasswordReset from './Screens/PasswordReset.js';
import HomePage from './Screens/HomePage.js';
import PostComplaint from './Screens/PostComplaint.js';
import BrowseChoose from './Screens/BrowseChoose.js';

import DelegateQurbani from './Screens/DelegateQurbani.js';
import UserInformationPage from './Screens/UserInformationPage';
import CleanStreets from './Screens/CleanStreets.js';
import SlotSelectionScreen from './Screens/SlotSelectionScreen.js';
import NextPage from './Screens/NextPage.js';
// import ProfilePage from './Screens/ProfilePage.js';

import CartPage from './Screens/CartPage.js';

import TransactionsPage from './Screens/TransactionsPage.js';
import Settings from './Screens/Settings.js';
import Help from './Screens/Help.js';
import My_Slots from './Screens/My_Slots.js'
import DetailScreen from './Screens/DetailScreen.js';
// import CheckoutForm from './Screens/CheckoutForm.js';
// import PaymentPage from './Screens/PaymentPage.js';
import DetailScreen2 from './Screens/DetailScreen2.js';
import AdminAnimal from './Screens/AdminAnimal.js';
import AddAnimal from './Screens/AddAnimal.js';
import EditAnimal from './Screens/EditAnimal.js';
import DeleteAnimal from './Screens/DeleteAnimal.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import store from './Redux/store';
import Profile from './Screens/Profile.js';
import UpdateProfile from './Screens/UpdateProfile.js';

import Checkout from './Screens/Checkout.js';

// import ParentComponent from './Screens/ParentComponent.js';

import { TabRouter } from 'react-navigation';
const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = React.useState('')
  React.useEffect(() => {
    checkUser();
  });

  const adminBankDetails = {
    accountTitle: 'Qurbani Hub',
    accountNo: 'QH123456789',
    bankName: 'Meezan Bank Karachi',
  };

  // const handlePayment = (paymentDetails) => {
  //   console.log('Payment Details:', paymentDetails);
  //   // Handle the payment details as needed
  // };

  const checkUser = async () => {
    const user = await AsyncStorage.getItem('currentuser');
    const getUser = JSON.parse(user);
    setUser(getUser)
  };

  // return (
  //   <SafeAreaView style={{ flex: 1 }}>
  //     <Checkout adminBankDetails={adminBankDetails} onPayment={handlePayment} />
  //   </SafeAreaView>
  // );

  const STRIPE_KEY = 'pk_test_51P8nyyEVkseDcypUUasBLlY78f1egyb5ChVaoLeUCBw6Cr8QvNsxHxI8eLUImFe1AgZUXFETwQf3T51mV3OcZ4GE001JpdZYjr'
  return (

    <Provider store={store}>
      {/* <StripeProvider publishableKey={STRIPE_KEY}>
       <Navigation /> 
      </StripeProvider> */}

      {/* <StatusBar style="auto" /> */}
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="FirstPage" component={FirstPage} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="PasswordReset" component={PasswordReset} />


          <Stack.Screen name="HomePage" component={HomePage} />

          <Stack.Screen name="PostComplaint" component={PostComplaint} options={{ headerShown: TabRouter }} />

          <Stack.Screen name="BrowseChoose" component={BrowseChoose} />

          <Stack.Screen name="DelegateQurbani" component={DelegateQurbani} />
          <Stack.Screen name="UserInformationPage" component={UserInformationPage} />
          <Stack.Screen name="CleanStreets" component={CleanStreets} options={{ headerShown: TabRouter }} />
          <Stack.Screen name="SlotSelectionScreen" component={SlotSelectionScreen} />
          <Stack.Screen name="NextPage" component={NextPage} />
          {/* <Stack.Screen name="ProfilePage" component={ProfilePage} /> */}

          <Stack.Screen name="CartPage" component={CartPage} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="UpdateProfile" component={UpdateProfile} />

          <Stack.Screen name="TransactionsPage" component={TransactionsPage} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="My_Slots" component={My_Slots} options={{ headerShown: TabRouter }}/>
          <Stack.Screen name="DetailScreen" component={DetailScreen} />

          {/* <Stack.Screen name="PaymentPage" component={PaymentPage} />*/}
          <Stack.Screen name="DetailScreen2" component={DetailScreen2} /> 
          <Stack.Screen name="AdminAnimal" component={AdminAnimal} />
          <Stack.Screen name="AddAnimal" component={AddAnimal} />
          <Stack.Screen name="EditAnimal" component={EditAnimal} />
          <Stack.Screen name="DeleteAnimal" component={DeleteAnimal} />
          {/* <Stack.Screen name="CheckoutForm" component={CheckoutForm} />*/}
          <Stack.Screen name="Checkout" component={Checkout} /> 
          {/* <Stack.Screen name="ParentComponent" component={ParentComponent} /> */}

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;