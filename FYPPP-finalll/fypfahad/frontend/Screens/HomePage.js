import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  Dimensions
} from "react-native";
import Modal from "react-native-modal";
const { width } = Dimensions.get('window');
const DrawerComponent = ({ isVisible, onClose, navigation }) => {
  const slideAnim = useRef(new Animated.Value(-300)).current;

  const signOut = () => {
    console.log('signout---->>>')
    AsyncStorage.removeItem('currentuser');
    AsyncStorage.clear();
    navigation.navigate('FirstPage')
  }

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 500,
      useNativeDriver: true,
    }).start(onClose);
  };

  useEffect(() => {
    if (isVisible) {
      slideIn();
    } else {
      slideOut();
    }
  }, [isVisible]);

  const menuOptions = [
    { title: "PROFILE", icon: require('../assets/profile.png') },
    { title: "CART", icon: require('../assets/cart.png') },
    { title: "MY SLOTS", icon: require('../assets/check-square.png') },
    { title: "SETTINGS", icon: require('../assets/settings.png') },
    { title: "HELP", icon: require('../assets/help.png') },
    { title: "SIGN OUT", icon: require('../assets/signOut.png') },
  ];

  const handleMenuOptionClick = (title) => {
    switch (title) {
      case "PROFILE":
        navigation.navigate("Profile");
        break;
      case "CART":
        navigation.navigate("CartPage");
        break;
      case "MY SLOTS":
        navigation.navigate("My_Slots");
        break;
      case "SETTINGS":
        navigation.navigate("Settings");
        break;
      case "HELP":
        navigation.navigate("Help");
        break;
      case "SIGN OUT":
        signOut()
        break;
      default:
        break;
    }

    // Close the drawer after navigation
    onClose();
  };

  const renderMenuOptions = () => {
    return menuOptions.map((option, index) => (
      <TouchableOpacity key={index} activeOpacity={0.9} style={styles.menuOption} onPress={() => handleMenuOptionClick(option.title)}>
        <Image source={option.icon} style={styles.menuIcon} />
        <Text style={styles.menuOptionText}>{option.title}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
    >
      <Animated.View style={styles.drawerContainer}>
        <View style={styles.drawerContent}>
          <TouchableOpacity style={styles.drawerOverlay} onPress={onClose} />
          {/* Drawer content */}
          <View style={styles.drawerInnerContent}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Image
                source={require('../assets/cross.png')} // Replace with your close icon image path
                style={styles.closeButtonImage}
              />
            </TouchableOpacity>
            <View style={styles.menuContainer}>{renderMenuOptions()}</View>
            {/* Add other drawer content here */}
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};


const HomePage = ({ navigation }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeIn = () => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    };

    const fadeOut = () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    };

    if (openDrawer === false) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [openDrawer, fadeAnim]);

  const renderDrawer = () => {
    if (openDrawer) {
      return <DrawerComponent isVisible={true} onClose={toggleDrawer} navigation={navigation} />;
    }
    return null;
  };

  // const fetchData = async () => {

  //   try {
  //     const response = await axiosInstance.post("/auth/user/signup", {
  //       body: {
  //         emailAddress: "testingTwentyOne@example.com",
  //         password: "passwordTestSeven",
  //         firstName: "IJKL",
  //         lastName: "MNOP",
  //         phoneNo: "+9-8-7-6-5-4-3-2-1",
  //       },
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     console.log(JSON.stringify({
  //       emailAddress: "testingFourteen@example.com",
  //       password: "passwordTestSeven",
  //       firstName: "IJKL",
  //       lastName: "MNOP",
  //       phoneNo: "+9-8-7-6-5-4-3-2-1",
  //     }))
  //     console.log(response)
  //     console.log(response.message)
  //   }
  //   catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appBar}>
        <TouchableOpacity
          style={styles.hamburgerButton}
          onPress={toggleDrawer}
        >
          <Image
            source={require("../assets/ham-icon.png")}
            style={styles.hamburgerIcon}
          />
        </TouchableOpacity>
        <Text style={styles.appBarText}>HOME</Text>
      </View>
      <Animated.Text style={[styles.headingText, { opacity: fadeAnim }]}>
        <Text style={{ fontSize: 36, fontWeight: "bold", textAlign: "left" }}>
          WHAT {''}
        </Text>
        WILL YOU CHOOSE TODAY?
      </Animated.Text>
      <ScrollView>
        <View style={styles.featureContainer}>
          <FeatureBox
            image={require("../assets/browse-choose.jpg")}
            title="Browse & Choose"
            description="Explore a comprehensive catalog of sacrificial animals."
            navigation={navigation}
          />
          <FeatureBox
            image={require("../assets/delegate.jpg")}
            title="Qurbani Pool"
            description="Join together in one Qurbani, sharing blessings collectively!"
            navigation={navigation}
          />
          <FeatureBox
            image={require("../assets/complain.jpg")}
            title="Post Complaints"
            description="Post complaints in case of any mishap."
            navigation={navigation}
          />
          <FeatureBox
            image={require("../assets/SlaughterHouse.jpg")}
            title="Clean Streets"
            description="Perform qurbani at our specialized slaughterhouse."
            navigation={navigation}
          />

        </View>
      </ScrollView>
      {/* Render the DrawerComponent conditionally */}
      {renderDrawer()}
    </SafeAreaView>
  );
};

const FeatureBox = ({ image, title, description, navigation }) => {
  const handleFeatureBoxClick = () => {
    switch (title) {
      case "Browse & Choose":
        navigation.navigate("BrowseChoose");
        break;
      case "Qurbani Pool":
        navigation.navigate("DelegateQurbani");
        break;
      case "Post Complaints":
        navigation.navigate("PostComplaint");
        break;
      case "Clean Streets":
        navigation.navigate("CleanStreets");
        break;
      default:
        break;
    }
  };

  return (
    <TouchableOpacity onPress={handleFeatureBoxClick} activeOpacity={0.9}>
      <View style={styles.featureBox}>
        <Image source={image} style={styles.featureImage} />
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f0fa'
  },
  appBar: {
    backgroundColor: "#7FB8E3",//"#2084c7",
    paddingTop: 50,
    paddingBottom: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    flexDirection: "row",
  },
  appBarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  hamburgerButton: {
    position: "absolute",
    left: 20,
    top: 50,
    zIndex: 1,
  },
  hamburgerIcon: {
    width: 30,
    height: 30,
  },
  content: {
    padding: 10,
  },
  featureContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  featureBox: {
    width: width * 0.5 - 16,
    height: 226,
    marginBottom: 12,
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 15,
    elevation: 0.2,
  },
  featureImage: {
    width: "100%",
    height: 120,
    borderRadius: 5,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#34495e",
  },
  featureDescription: {
    fontSize: 12,
    marginTop: 5,
    lineHeight: 16,
    textAlign: "left",
  },
  headingText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#34495e",
  },
  drawerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  drawerContent: {
    flex: 1,
    // backgroundColor: '#f7f7f7',
  },
  drawerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black overlay
  },
  drawerInnerContent: {
    width: '68%', // 50% of screen width
    height: '100%', // Full height of the screen
    backgroundColor: '#e6f5ff', //'#ebebeb', 
    padding: 20, // Add padding or adjust as needed
  },
  closeButton: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  closeButtonImage: {
    width: 50, // Adjust width as needed
    height: 50, // Adjust height as needed
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: '#ccc',
  },
  menuIcon: {
    width: 18, // Adjust width as needed
    height: 18, // Adjust height as needed
    marginRight: 10, // Adjust spacing between icon and text
  },
  menuOptionText: {
    fontSize: 16,
  },
  menuContainer: {
    marginTop: 55, // Adjust the marginTop to move the menu options lower
  },
});

export default HomePage;