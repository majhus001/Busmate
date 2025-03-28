import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, ScrollView, Dimensions } from "react-native";
import { API_BASE_URL } from "../../../apiurl";


const AdminHome = ({ navigation, route }) => {
  // Extract admin details from route params
  const { username = "Admin", adminId="NA" ,city = "Unknown City", state = "Unknown State" } = route.params || {};

  const [buses, setBuses] = useState([
    { id: "1", busNo: "TN-38-1234", route: "Gandhipuram to Ukkadam", time: "9:00 AM", stops: "Gandhipuram → Peelamedu → Singanallur → Ukkadam", Conductor: "Arun Kumar", status: "Available", expanded: false },
    { id: "2", busNo: "TN-66-5678", route: "RS Puram to Avinashi", time: "10:30 AM", stops: "RS Puram → Gandhipuram → Saravanampatti → Avinashi", Conductor: "Vijay Anand", status: "On Service", expanded: false },
    { id: "3", busNo: "TN-37-9876", route: "Town Hall to Vadavalli", time: "12:00 PM", stops: "Town Hall → Ukkadam → Saibaba Colony → Vadavalli", Conductor: "Karthik Raj", status: "Available", expanded: false },
  ]);

  const conductors = [
    { id: "1", name: "Sathish Kumar", contact: "9876543210", status: "Active" },
    { id: "2", name: "Murugan M", contact: "9876543211", status: "On Leave" },
    { id: "3", name: "Karthikeyan S", contact: "9876543212", status: "Active" },
  ];

  const toggleDropdown = (id) => {
    setBuses((prevBuses) =>
      prevBuses.map((bus) => (bus.id === id ? { ...bus, expanded: !bus.expanded } : bus))
    );
  };

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const [busResponse, conductorResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/Admin/buses/fetchbus`),
          axios.get(`${API_BASE_URL}/api/Admin/conductor`),
        ]);

        setBuses(busResponse.data);
        setConductors(conductorResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderHeader = () => (
    <>
      <View style={styles.leftSection}>
        <Image
          source={{ uri: "https://th.bing.com/th/id/OIP.aKiTvd6drTIayNy2hddhiQHaHa?w=1024&h=1024&rs=1&pid=ImgDetMain" }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{username}</Text>
        <Text style={styles.profileRole}>Administrator</Text>
        <Text style={styles.profileDetail}>📍 {city}, {state}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddConductor", {adminId})}>
          <Text style={styles.addButtonText}>+ Add Conductor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddBuses", {adminId})}>
          <Text style={styles.addButtonText}>+ Add Bus</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Available Buses</Text>
    </>
  );

  const renderBusItem = ({ item }) => (
    <View style={styles.busCard}>
      <TouchableOpacity onPress={() => toggleDropdown(item.id)} style={styles.busHeader}>
        <Text style={styles.busText}>Bus No: {item.busNo}</Text>
        <Text style={styles.busText}>Route: {item.route}</Text>
        <Text style={styles.busText}>Time: {item.time}</Text>
        <Text style={[styles.status, item.status === "Available" ? styles.available : styles.onService]}>
          {item.status}
        </Text>
      </TouchableOpacity>
      {item.expanded && (
        <View style={styles.dropdown}>
          <Text style={styles.dropdownText}>Stops: {item.stops}</Text>
          <Text style={styles.dropdownText}>Available Seats: {Math.floor(Math.random() * 40) + 10}</Text>
          <Text style={styles.dropdownText}>Conductor: {item.Conductor}</Text>
        </View>
      )}
    </View>
  );

  const renderFooter = () => (
    <View style={styles.rightSection}>
      <Text style={styles.sectionTitle}>List of Conductors</Text>
      {conductors.map((conductor) => (
        <View key={conductor.id} style={styles.conductorCard}>
          <Text style={styles.conductorName}>{conductor.name}</Text>
          <Text style={styles.conductorContact}>{conductor.contact}</Text>
          <Text style={[styles.conductorStatus, conductor.status === "Active" ? styles.active : styles.onLeave]}>
            {conductor.status}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={buses}
      keyExtractor={(item) => item.id}
      renderItem={renderBusItem}
      ListFooterComponent={renderFooter}
    />
  );
};

export default AdminHome;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 20 },
  leftSection: { alignItems: "center", marginBottom: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: "#007bff" },
  profileName: { fontSize: 18, fontWeight: "bold" },
  profileRole: { fontSize: 14, color: "gray" },
  profileDetail: { fontSize: 14, color: "gray", marginBottom: 5 },
  
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  addButton: { backgroundColor: "#28a745", paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8 },
  addButtonText: { color: "#fff", fontWeight: "bold" },

  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },

  busCard: { backgroundColor: "#007bff", borderRadius: 10, marginBottom: 10, padding: 10 },
  busHeader: { padding: 10 },
  busText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  status: { fontSize: 14, fontWeight: "bold", textAlign: "right" },
  available: { color: "#28a745" },
  onService: { color: "#ffc107" },
  dropdown: { marginTop: 5, backgroundColor: "#e9ecef", padding: 10, borderRadius: 8 },

  rightSection: { backgroundColor: "#fff", padding: 15, borderRadius: 10 },
  conductorCard: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  conductorName: { fontSize: 16, fontWeight: "bold" },
  conductorContact: { fontSize: 14, color: "gray" },
  conductorStatus: { fontSize: 14, fontWeight: "bold", textAlign: "right" },
  active: { color: "#28a745" },
  onLeave: { color: "#dc3545" },
});
