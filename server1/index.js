const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const buses = require("./Admin/BusRoutes/Buses"); 
const Etm = require("./Conductor/Ticketbook");
const busroutes = require("./Conductor/BusRoutes");
const loginRoutes = require("./Authentication/LoginRoute");
const SignupRoute = require("./Authentication/SignupRoute");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/Admin/buses", buses);
app.use("/api/tickets", Etm);
app.use("/api/busroutes/", busroutes);
app.use("/api/auth", loginRoutes);
app.use("/api/authSign", SignupRoute);

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://thamilprakasam2005:appichithamil@cluster0.qqwny.mongodb.net/Bus_Mate");
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

connectDB();



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
