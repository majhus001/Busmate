import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import { API_BASE_URL } from "../../../apiurl";

const AddConductor = ({ navigation, route }) => {

  const { adminId="NA" } = route.params || {};

  const [Username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    // Validate and format the date properly
    let formattedDOB = "";
    if (dob) {
      const parsedDate = new Date(dob);
      if (!isNaN(parsedDate.getTime())) {
        formattedDOB = parsedDate.toISOString().split("T")[0]; // ✅ Converts to YYYY-MM-DD
      } else {
        alert("Invalid Date of Birth. Please enter a valid date (YYYY-MM-DD).");
        return;
      }
    }

    const conductorData = {
      Username: Username.trim(),
      phoneNumber: phoneNumber.trim(),
      dob: formattedDOB, // ✅ Correctly formatted date
      age: parseInt(age, 10) || null,
      gender: gender,
      password: password,
      adminId: adminId,
    };

    console.log("Sending Data:", conductorData); 

    try {
      const response = await axios.post(`${API_BASE_URL}/api/Admin/Conductor/add`, conductorData);
      console.log("Conductor added successfully!", response.data);
      Alert.alert("Success", "Conductor added successfully!");
    } catch (error) {
      console.error("Error adding conductor:", error.response ? error.response.data : error.message);
      Alert.alert("Error", error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Full Name *</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="Enter Full Name"
        value={Username}
        onChangeText={setUsername}
      />

      <Text>Phone Number *</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="Enter Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <Text>Date of Birth</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="Enter DOB (YYYY-MM-DD)"
        value={dob}
        onChangeText={setDob}
      />

      <Text>Age</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="Enter Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <Text>Gender</Text>
      <RNPickerSelect
        onValueChange={(value) => setGender(value)}
        items={[
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
          { label: "Other", value: "Other" },
        ]}
        style={{
          inputAndroid: { borderWidth: 1, padding: 10, marginBottom: 10 },
          inputIOS: { borderWidth: 1, padding: 10, marginBottom: 10 },
        }}
      />

      <Text>Conductor Password</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Add Conductor" onPress={handleSubmit} />
    </View>
  );
};

export default AddConductor;