
const express = require("express");
const router = express.Router();

const {
  addItem,
  deleteItem,
  updateItem,
  getmenuItem,
  availableQuantity
} = require("../controllers/itemController");
const {
  handleOrder,
  getOrder,
  getAllorder,
  updateStatus,
  deleteOrder,
  updateOrder,
  saveOfflineOrder,
  getofflineorder,
  deleteOfflineOrder,
  updateOfflineOrder
} = require("../controllers/orderController");

const {
  handlePayment,
  savePayment,
  getPaymentsByUserId,
  fetchAllPayment,
  updatePayment ,
  deletePayment
} = require("../controllers/paymentController");
const {
  addToCart,
  getcartitems,
  updateCartItemQuantity,
  deleteCartItem,
  removefromcart,
  getcartitemsfororderpage,
  clearCart,
  getUserCart,
  removeItemFromDataBase
} = require("../controllers/cartController");

const {
  test,
  LoginUser,
  getProfile,
  logout,
} = require("../controllers/authController");

const {
  registerUser
} = require("../controllers/testController")

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

router.get('/items/:itemId/availableQuantity',availableQuantity);

router.post("/add-to-cart", addToCart);
router.get("/get-cart-items/:userId", getcartitems);
router.put("/cart/updateQuantity", updateCartItemQuantity);
router.delete("/cart/deleteItem", deleteCartItem);
router.delete("/cart/clear/:userId", clearCart);

router.post("/remove-from-cart", removefromcart);
router.get("/getcartitemsfororderpage/:userId", getcartitemsfororderpage);
router.get('/cart/user/:userId', getUserCart);
router.get("/test", () => console.log("Testing2"));
router.post("/orders/create", handleOrder);
router.get("/orders/user/:userId", getOrder);
router.get("/orders", getAllorder);
router.put("/orders/:orderId", updateStatus);
//router.put('/orders/:orderId',updateOrder);
router.delete("/orders/:orderId", deleteOrder);
router.post("/save-offline-order", saveOfflineOrder);
router.get("/offline-orders",getofflineorder)
router.delete("/offline-orders/:orderId",deleteOfflineOrder);
router.put("/offline-orders/:orderId",updateOfflineOrder);

router.delete('/cart/:userId/item/:itemId',removeItemFromDataBase);


//payment
router.post("/payments/create", savePayment);
router.post("/simulate-payment", handlePayment);
router.get("/payments/user/:userId", getPaymentsByUserId);
router.get("/payments", fetchAllPayment);
router.put('/payments/:id',updatePayment );
router.delete('/payments/:id',deletePayment )
module.exports = router;
