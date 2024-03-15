// controllers/testController.js
const jwt = require("jsonwebtoken");
const { response } = require("express");
const User = require("../models/user");
require('dotenv').config();
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

const logout = (req, res) => {
  
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};

module.exports = {
  test,
  registerUser,
  LoginUser,
  getProfile,
  logout
};
