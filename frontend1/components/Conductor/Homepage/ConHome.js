import React, { useLayoutEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./ConHomeStyles"; // Importing styles

const ConHome = ({ navigation }) => {
    
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Conductor details (Replace with dynamic API data if needed)
  const conductorInfo = {
    name: "John Doe",
    age: 35,
    address: "123, Main Street, New York",
    contact: "1234567890",
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>BusMate</Text>
        <Text style={styles.panelName}>Conductor Panel</Text>
      </View>

      {/* Conductor Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>👤 Conductor Details</Text>
        <Text style={styles.detailText}><Text style={styles.bold}>Name:</Text> {conductorInfo.name}</Text>
        <Text style={styles.detailText}><Text style={styles.bold}>Age:</Text> {conductorInfo.age}</Text>
        <Text style={styles.detailText}><Text style={styles.bold}>Address:</Text> {conductorInfo.address}</Text>
        <Text style={styles.detailText}><Text style={styles.bold}>Phone:</Text> {conductorInfo.contact}</Text>
      </View>

      {/* Start Ride Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("conbusselect")}>
        <Text style={styles.buttonText}>🚀 Start Ride</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConHome;
