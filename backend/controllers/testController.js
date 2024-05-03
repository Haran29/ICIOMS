// controllers/testController.js
/*const jwt = require("jsonwebtoken");
const { response } = require("express");
const User = require("../models/user");
require("dotenv").config();
const { hashPassword, comparePassword } = require("../helpers/auth");
const secretKey = process.env.SECRET_KEY;
//const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bodyParser = require("body-parser");
//const Pass = require("../models/Pass");
//const otpGenerator = require("otp-generator");*/


// controllers/testController.js
const jwt = require("jsonwebtoken");
const { response } = require("express");
const User = require("../models/user");
require("dotenv").config();
const { hashPassword, comparePassword } = require("../helpers/auth");
const secretKey = process.env.SECRET_KEY;
const crypto = require("crypto");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');


const test = (req, res) => {
  res.json("Test is Working");
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ssavindi660@gmail.com',
    pass: 'jeux mumt hcss dygs',
  },
});


const registerUser = async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;
    console.log(password)
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "password is required",
      });
    }

    const hashedPassword = await hashPassword(password);

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email Alreay Taaken",
      });
    }

    const user = await User.create({
      name,
      email,
      contact,
      password: hashedPassword,
    });

    await sendRegistrationEmail(user);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to send registration email
const sendRegistrationEmail = async (user) => {
  try {
    const mailOptions = {
      from: 'your_email@gmail.com',
      to: user.email,
      subject: 'Registration Successful',
      html: `
        <p>Dear ${user.name},</p>
        <p>Thank you for registering with us!</p>
        <p>Welcome to our platform.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Registration email sent successfully');
  } catch (error) {
    console.error('Error sending registration email:', error);
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "User Not found",
      });
    }

    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        secretKey,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    } else {
      return res.json({
        error: "Password not Matched",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, secretKey, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

//--update profile
// Fetch user profile
/*const gettuser = async (req, res) => {
  try {
    const user = await User.findOne();
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update user profile
const updateUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.findOne();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.email = email;
    await user.save();

    res.json({ message: "User details updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};*/

//---------
/*
// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ssavindi660@gmail.com', 
    pass: 'Sanka_99', 
  },
});

// Route to send OTP for password reset
const sendotp = async (req, res) => {
  const { email } = req.body;
  const OTP = otpGenerator.generate(6, { upperCase: false, specialChars: false });

  try {
    // Save OTP to the database
    await User.findOneAndUpdate({ email }, { otp: OTP }, { upsert: true });

    // Send OTP via email
    await transporter.sendMail({
      from: 'ssavindi660@gmail.com', // Replace with your email
      to: email,
      subject: 'Password Reset OTP',
      text: Your OTP for password reset is: ${OTP},
    });

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

// Route to reset password with OTP verification
const resettpassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Find the user by email and OTP
    const user = await User.findOne({ email, otp });
    if (!user) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Update the user's password and remove OTP
    user.password = newPassword;
    user.otp = null;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Failed to reset password' });
  }
};
*/
//---------------------


const gettuser = async (req, res) => {
  try {
    const { userid } = req.params;
    const user = await User.findById(userid);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ userid: user._id, ...user._doc });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
};

const updateUser =  async (req, res) => {
  try {
    const { name, email, contact } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name, email, contact },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User details updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user details' });
  }
};

//delete user
// Fetch all users
const fetchuser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteduser = await User.findByIdAndDelete(userId);
    if (!deleteduser) {
      return res.json({ error: "user not found" });
    }
    res.json({ message: "Item deleted successfully", deleteduser });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
//--------------

// Generate report of registered users
const genaraterepo = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//------

//adduser details
const adduser = async (req, res) => {
  // Route to add a new user

  const { name, email, contact, role } = req.body;

  try {
    const user = new User({ name, email, contact, role });
    await user.save();
    res.json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Failed to add user" });
  }
};

//--------------

// Route to update user role
const updaterole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { role });
    res.json({ message: "User role updated successfully" });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};


const resetpassword = async (req, res)=> {
  const { email, password } = req.body;

try {
  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  //const hashedPassword = await hashPassword(newPassword);
  // Update the user's password
  const hashedPassword = await hashPassword(password);
  user.password = hashedPassword;
  await user.save();

  return res.json({ message: 'Password reset successfully' });
} catch (error) {
  console.error('Failed to reset password:', error);
  return res.status(500).json({ message: 'An error occurred while resetting the password.' });
    }
  };

module.exports = {
  test,
  registerUser,
  LoginUser,
  getProfile,
  logout,
  updateUser,
  gettuser,
  deleteUser,
  genaraterepo,
  fetchuser,
  adduser,
  updaterole,
  resetpassword
};
