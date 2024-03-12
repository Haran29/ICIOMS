// routes/authRoutes.js

const express = require("express");
const router = express.Router();

const {
  test,
  registerUser,
  LoginUser,
  getProfile,
  logout,
} = require("../controllers/authController");

router.get("/", test);
router.post("/SignUpPage", registerUser);
router.post("/LoginPage", LoginUser);
router.get("/profile", getProfile);
router.post("/logout", logout);
module.exports = router;
0;
