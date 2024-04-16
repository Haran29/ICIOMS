// routes/authRoutes.js

const express = require("express");
const router = express.Router();

const {
  addItem,
  deleteItem,
  updateItem,
  getmenuItem,
} = require("../controllers/itemController");
const {
  handleOrder,
  getOrder,
  getAllorder,
  updateStatus
} = require("../controllers/orderController");

const { handlePayment } = require("../controllers/paymentController");
const {
  addToCart,
  getcartitems,
  updateCartItemQuantity,
  deleteCartItem,
  removefromcart,
  getcartitemsfororderpage,
  clearCart,
} = require("../controllers/cartController");

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
router.post("/add-item", addItem);

router.get("/get-menuItem", getmenuItem);
router.get("/items", getmenuItem);
// Delete Item Route
router.delete("/delete-item/:id", deleteItem);

// Update Item Route
router.put("/update-item/:id", updateItem);

router.post("/add-to-cart", addToCart);
router.get("/get-cart-items/:userId", getcartitems);
router.put("/cart/updateQuantity", updateCartItemQuantity);
router.delete("/cart/deleteItem", deleteCartItem);
router.delete("/cart/clear/:userId", clearCart);

router.post("/remove-from-cart", removefromcart);
router.get("/getcartitemsfororderpage/:userId", getcartitemsfororderpage);
router.get("/test", () => console.log("Testing2"));
router.post("/simulate-payment", handlePayment);
router.post("/orders/create", handleOrder);
router.get("/orders/user/:userId", getOrder);
router.get("/orders",getAllorder);
router.put('/orders/:orderId',updateStatus);

module.exports = router;
