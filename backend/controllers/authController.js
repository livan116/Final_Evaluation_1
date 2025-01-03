const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password
    });

    // Save the user
    await user.save();

    // Create and return JWT
    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token,message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate user input
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if password matches (assuming you use bcrypt for password encryption)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate a JWT token with user id and email
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

        res.status(200).json({ success: true, token });

    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


exports.getUser = async (req, res) => {
  try {
    const userId = req.user.id; // Assumes you've added middleware to decode the token
    const user = await User.findById(userId).select("-password"); // Exclude the password
    if (!user) {
      return res.status(404).json({ user, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateUser = async (req, res) => {
  const { userName, email, oldPassword, newPassword } = req.body;
  const userId = req.user.id; // Extracted from token via middleware
  console.log(userId);

  try {
    // Fetch the user
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update username if provided
    if (userName && userName !== user.name) {
      user.name = userName;
    }

    // Update email if provided and different
    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res
          .status(400)
          .json({ success: false, message: "Email already in use" });
      }
      user.email = email;
    }

    // Update password if both old and new passwords are provided
    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, message: "Old password is incorrect" });
      }
      if (oldPassword === newPassword) {
        return res.status(400).json({
          success: false,
          message: "New password cannot be the same as the old password",
        });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = newPassword;
    }

    // Save changes
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
