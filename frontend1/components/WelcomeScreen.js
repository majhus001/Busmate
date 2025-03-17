import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const WelcomeScreen = ({ navigation }) => {
  // const { city, state } = route.params || {};
  // console.log("City:", city);
  return (
    <View style={styles.container}>
      {/* Logo inside a circular white background */}
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: "https://webstockreview.net/images/clipart-bus-tourist-bus-3.png",
          }}
          style={styles.logo}
        />
      </View>
      <Text
        style={styles.title}
        onPress={() => navigation.navigate("ushomescreen")}
      >
        Welcome to BusMate
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("signup")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007bff", // Blue background
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: 140, // Circle size
    height: 140,
    borderRadius: 70, // Makes it circular
    backgroundColor: "#fff", // White background
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5, // For Android shadow
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: "#007bff",
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
