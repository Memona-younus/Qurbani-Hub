import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

// Set up calendar locale
LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
};
LocaleConfig.defaultLocale = 'en';

// Define the component
const SlotSelectionScreen = () => {
  // State variables
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [calendarHeight, setCalendarHeight] = useState(250);
  const navigation = useNavigation();

  // Handle arrow press
  const handleArrowPress = () => {
    if (selectedDate && selectedSlot) {
      // Navigate to the next page
      navigation.navigate('NextPage', { selectedDate, selectedSlot });
    } else {
      // Show an alert if date and slot are not selected
      Alert.alert('Error', 'Please select both date and a slot.');
    }
  };

  // Set initial date to the current date
  useEffect(() => {
    const currentDate = new Date();
    const dateString = currentDate.toISOString().split('T')[0];
    handleDatePress({ dateString });
  }, []);

  // Generate slots for a selected date
  const generateSlotsForDate = (date) => {
    return [
      { id: 1, time: '8:00 AM - 10:00 AM' },
      { id: 2, time: '10:30 AM - 12:30 PM' },
      { id: 3, time: '1:00 PM - 3:00 PM' },
      { id: 4, time: '3:30 PM - 5:30 PM' },
    ];
  };

  // Handle date press
  const handleDatePress = (date) => {
    setSelectedDate(date.dateString);
    const dateSlots = generateSlotsForDate(date.dateString);
    setSelectedSlots(dateSlots);
    setSelectedSlot(null); // Reset selected slot when the date changes
  };

  // Handle slot press
  const handleSlotPress = (slot) => {
    setSelectedSlot(slot);
  };

  // Render each slot item
  const renderSlotItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.slotItem, selectedSlot === item ? styles.selectedSlot : null]}
      onPress={() => handleSlotPress(item)}
    >
      <Text>{item.time}</Text>
    </TouchableOpacity>
  );

  // Adjust the calendar height based on the number of visible months
  const onVisibleMonthsChange = (months) => {
    const numberOfDaysInFirstMonth = new Date(months[0].year, months[0].month + 1, 0).getDate();
    const numberOfDaysInLastMonth = new Date(months[months.length - 1].year, months[months.length - 1].month + 1, 0).getDate();
    const maxDays = Math.max(numberOfDaysInFirstMonth, numberOfDaysInLastMonth);
    const newCalendarHeight = 50 + 40 * Math.ceil(maxDays / 7); // Adjust these values as needed
    setCalendarHeight(newCalendarHeight);
  };

  // Return the JSX for the component
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../assets/backarrow.png')} style={styles.backArrow} />
      </TouchableOpacity>
      <View style={styles.calendarContainer}>
        <Text style={styles.heading}>Book Your Slot!</Text>
        <Calendar
          onDayPress={handleDatePress}
          markedDates={selectedDate ? { [selectedDate]: { selected: true, disableTouchEvent: true, selectedDotColor: '#c7dceb' } } : {}}
          style={[styles.calendar, { height: calendarHeight }]}
          onVisibleMonthsChange={onVisibleMonthsChange}
        />
      </View>

      {selectedDate && (
        <View style={styles.availableSlotsContainer}>
          <Text style={styles.availableSlotsHeading}>Available Slots:</Text>
          <FlatList
            data={selectedSlots}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderSlotItem}
          />
          {/* Add an arrow button */}
          <TouchableOpacity onPress={handleArrowPress} style={styles.arrowButton}>
            <Image source={require('../assets/arrow.png')} style={styles.arrowImage} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f0fa',
    paddingTop: 10,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
  },
  backArrow: {
    width: 40,
    height: 40,
    marginTop: 32,
  },
  calendarContainer: {
    marginTop: 5,
    marginBottom: 10,
    height: 250,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    marginTop: 35,
    color: '#2084c7',
  },
  availableSlotsContainer: {
    margin: 20,
    marginTop: 175,
  },
  availableSlotsHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2084c7',
    textDecorationLine: 'underline',
    marginBottom: 2,
    marginTop: 9,
    right: -6,
  },
  slotItem: {
    padding: 7,
    margin: 4,
    borderWidth: 0.75,
    borderColor: '#2084c7', 
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  selectedSlot: {
    backgroundColor: '#c7dceb',
  },
  arrowButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  arrowImage: {
    width: 40,
    height: 40,
    left: 140,
  },
});

export default SlotSelectionScreen;
