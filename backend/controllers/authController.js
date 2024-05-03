// controllers/testController.js
const jwt = require("jsonwebtoken");
const { response } = require("express");
const User = require("../models/user");
require("dotenv").config();
const { hashPassword, comparePassword } = require("../helpers/auth");
const secretKey = process.env.SECRET_KEY;

const test = (req, res) => {
  res.json("Test is Working");
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;
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

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

/*const LoginUser = async (req, res) => {
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
      // Store user information in session
      req.session.user = {
        email: user.email,
        id: user._id,
        name: user.name,
        role:user.role,
      };
      res.json(user);
    } else {
      return res.json({
        error: "Password not Matched",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
*/

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
      // Store user information in session
      req.session.user = {
        email: user.email,
        id: user._id,
        name: user.name,
        role:user.role,
      };
      res.json(user);
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
  if (req.session && req.session.user) {
    res.json(req.session.user);
  } else {
    res.json(null);
  }
};


const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).json({ error: "Logout failed" });
    } else {
      res.clearCookie("connect.sid"); 
      res.json({ success: true, message: "Logout successful" });
    }
  });
};

module.exports = {
  test,
  registerUser,
  LoginUser,
  getProfile,
  logout,
};
