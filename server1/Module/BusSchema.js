const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    busRouteNo: String,
    busNo: String,
    busPassword: String,
    totalShifts: Number,
    totalSeats: Number,
    busType: String,
    state: String,
    city: String,
    fromStage: String,
    toStage: String,
    prices: Object,
    timings: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Buses", busSchema);
