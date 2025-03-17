const mongoose = require("mongoose");

const ConductorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  dob: { type: Date },
  age: { type: Number },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  userName: { type: String, required: true },
  password: { type: String, required: true },
});

const Conductor = mongoose.model("Conductor", ConductorSchema);

module.exports = Conductor;  // Ensure this is exporting the model