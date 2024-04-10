// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const { addItem, deleteItem, updateItem, getMenuItem, generateReport } = require('../controllers/itemController');

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
// Read Item Route
router.get('/get-menuItem', getMenuItem)
// Delete Item Route
router.delete('/delete-item/:id', deleteItem);
// Update Item Route
router.put('/update-item/:id', updateItem);
// Generate Report Route
router.get('/generate-report', generateReport);

module.exports = router;
