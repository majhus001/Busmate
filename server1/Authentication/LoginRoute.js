const express = require("express");
const router = express.Router();
const User = require("../Module/User");
const Conductor = require("../Module/Conductor_sc");

router.post("/login", async (req, res) => {
  const { Username, password, role } = req.body;  // Changed from userName to Username

  try {
    let user;
    let Model;

    
    switch (role) {
      case "Conductor":
        Model = Conductor;
        user = await Model.findOne({ UserName: Username, password }); 
        break;
      case "Admin":
      case "User":
        Model = User;
        user = await Model.findOne({ 
          Username,  
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
    console.log(user._id)

    const userResponse = {
      message: "Login successful!",
      user: {
        username: user.Username, 
        adminId: user._id,
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