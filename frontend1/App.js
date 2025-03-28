import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdBuses from "./components/Admin/BusRoute/AdBuses";
import ConHome from "./components/Conductor/Homepage/ConHome";
import BusSelection from "./components/Conductor/SelectBus/BusSelection";
import Buslogin from "./components/Conductor/Buslogin/Buslogin";
import EtmTicket from "./components/Conductor/Ticket/EtmTicket";
import AdRoutes from "./components/Admin/BusRoute/AdRoutes";
import Payment from "./components/Conductor/Ticket/Payment";
import TicketSuccess from "./components/Conductor/Ticket/TicketSuccess";
import UserHomeScreen from "./components/Users/Homescreen/UserHomeScreen";
import UserMap from "./components/Users/Map/UserMap";
import WelcomeScreen from "./components/WelcomeScreen";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import AdminHome from "./components/Admin/Homepage/AdminHome";
import AddConductor from "./components/Admin/Conductor/AddConductor";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="welcomepage"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AddBuses" component={AdBuses} />
        <Stack.Screen name="conhomepage" component={ConHome} />
        <Stack.Screen name="conbusselect" component={BusSelection} />
        <Stack.Screen name="buslogin" component={Buslogin} />
        <Stack.Screen name="taketicket" component={EtmTicket} />
        <Stack.Screen name="adroutes" component={AdRoutes} />
        <Stack.Screen name="payment" component={Payment} />
        <Stack.Screen name="ticsuccess" component={TicketSuccess} />
        <Stack.Screen name="ushomescreen" component={UserHomeScreen} />
        <Stack.Screen name="usmap" component={UserMap} />
        <Stack.Screen name="welcomepage" component={WelcomeScreen} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="AdminHome" component={AdminHome} />
        <Stack.Screen name="AddConductor" component={AddConductor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
