const express = require("express");
const router = express.Router();
const User = require("../Module/User");
const Conductor = require("../Module/Conductor_sc");

router.post("/login", async (req, res) => {
  const { Username, password, role } = req.body;  // Changed from userName to Username

  try {
    let user;
    let Model;

    // Select the appropriate model based on role
    switch (role) {
      case "Conductor":
        Model = Conductor;
        user = await Model.findOne({ fullName: Username, password }); 
        console.log({user})
        break;
      case "Admin":
      case "User":
        Model = User;
        user = await Model.findOne({ 
          Username,  // Use Username directly as it matches the schema
          password,
          role
        });
        break;
      default:
        return res.status(400).json({ error: "Invalid role" });
    }

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials or role" });
    }

    const userResponse = {
      message: "Login successful!",
      user: {
        Username: user.Username || user.userName, // Handle both field names
        role: user.role,
        city: user.city,
        state: user.state
      }
    };

    res.json(userResponse);

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;