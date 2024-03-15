// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const { addItem, deleteItem, updateItem ,getmenuItem } = require('../controllers/itemController');

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

// Add Item Route
router.post('/add-item', addItem);

router.get('/get-menuItem',getmenuItem)
// Delete Item Route
router.delete('/delete-item/:id', deleteItem);

// Update Item Route
router.put('/update-item/:id', updateItem);

module.exports = router;

