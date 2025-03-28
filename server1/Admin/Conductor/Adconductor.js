const express = require("express");
const router = express.Router();
const Conductor = require("../../Module/Conductor_sc");

router.post("/add", async (req, res) => {
  try {
    let { fullName, phoneNumber, dob, age, gender, userName, password } = req.body;

    console.log("Received Data:", req.body); // ✅ Log the received data

    if (!fullName || !phoneNumber || !password || !userName) {
      return res.status(400).json({ error: "Full Name, Phone Number, User Name, and Password are required!" });
    }

    // ✅ Validate and Convert DOB
    if (dob) {
      const parsedDate = new Date(dob);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ error: "Invalid Date of Birth (DOB). Use YYYY-MM-DD format." });
      }
      dob = parsedDate;
    }

    const newConductor = new Conductor({ fullName, phoneNumber, dob, age, gender, userName, password });
    await newConductor.save();

    res.status(201).json({ message: "Conductor added successfully!", conductor: newConductor });
  } catch (error) {
    console.error("Error saving conductor:", error);

    // Send more details to the frontend
    res.status(500).json({ error: error.message || "Internal Server Error", details: error });
  }
});

module.exports = router;